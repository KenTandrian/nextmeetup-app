import React, { createContext, useState, useEffect } from "react";

// INITIAL CONTEXT (MyContext.js)
const NotificationContext = createContext({
    notification: null as INotification,
    showNotification: (notifData: INotification) => {},
    hideNotification: () => {}
});

// MAKE CONTEXT PROVIDER (MyProvider.js)
export const NotificationContextProvider = (props: { children?: React.ReactNode }) => {
    const [activeNotif, setActiveNotif] = useState<INotification>();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (activeNotif && (activeNotif.status === 'error' || activeNotif.status === 'success')){
            timer = setTimeout(() => {
                setActiveNotif(null);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [activeNotif])

    const showNotifHandler = (notifData: INotification) => {
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