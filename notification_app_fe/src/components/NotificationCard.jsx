import React from "react";

function NotificationCard({ notification, isRead, onRead }) {
  const type = notification.Type || notification.type;
  const message = notification.Message || notification.message;
  const timestamp = notification.Timestamp || notification.timestamp;

  return (
    <div className={isRead ? "card read" : "card unread"}>
      <div>
        <span className={"badge " + type}>{type}</span>
        {!isRead && <span className="unread-text">Unread</span>}
      </div>

      <h3>{message}</h3>
      <p>{timestamp}</p>

      {!isRead && (
        <button className="small-button" onClick={onRead}>
          Mark as read
        </button>
      )}
    </div>
  );
}

export default NotificationCard;
