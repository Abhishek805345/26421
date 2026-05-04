import React from "react";
import NotificationCard from "./NotificationCard.jsx";

function NotificationList({ notifications, readIds, markAsRead }) {
  if (notifications.length === 0) {
    return <p>No notifications found.</p>;
  }

  return (
    <div className="list">
      {notifications.map(function (notification, index) {
        const id = notification.ID || notification.id || index;
        const isRead = readIds.includes(id);

        return (
          <NotificationCard
            key={id}
            notification={notification}
            isRead={isRead}
            onRead={() => markAsRead(id)}
          />
        );
      })}
    </div>
  );
}

export default NotificationList;
