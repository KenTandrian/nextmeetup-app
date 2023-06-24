import React, { useContext } from 'react';

import MainNavigation from './MainNavigation';
import Notification from '../ui/Notification';

import classes from './Layout.module.css';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notifCtx = useContext(NotificationContext);
  const activeNotification: any = notifCtx.notification;

  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      {
        activeNotification && (
          <Notification 
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status}  
          />
        )
      }
    </div>
  );
}

export default Layout;
