import React, { createContext, useState, useEffect } from "react";

// INITIAL CONTEXT (MyContext.js)
const NotificationContext = createContext({
    notification: null,
    showNotification: (notifData) => {},
    hideNotification: () => {}
});

// MAKE CONTEXT PROVIDER (MyProvider.js)
export const NotificationContextProvider = (props) => {
    const [activeNotif, setActiveNotif] = useState();

    useEffect(() => {
        if (activeNotif && (activeNotif.status === 'error' || activeNotif.status === 'success')){
            const timer = setTimeout(() => {
                setActiveNotif(null);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [activeNotif])

    const showNotifHandler = (notifData) => {
        setActiveNotif(notifData);
    }

    const hideNotifHandler = () => {
        setActiveNotif(null);
    }

    const context = {
        notification: activeNotif,
        showNotification: showNotifHandler,
        hideNotification: hideNotifHandler
    }
    
    return (
        <NotificationContext.Provider value={context}>
            { props.children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext;