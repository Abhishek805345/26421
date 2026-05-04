import React, { useEffect, useState } from "react";
import NotificationList from "../components/NotificationList.jsx";
import useNotifications from "../hooks/useNotifications.js";
import sortNotifications from "../utils/sortNotifications.js";
import { Log } from "../api/log.js";

function PriorityNotifications() {
  const data = useNotifications();
  const [readIds, setReadIds] = useState([]);
  const [topCount, setTopCount] = useState(5);

  useEffect(function () {
    console.log("Priority page opened");
    Log("frontend", "info", "page", "Priority notifications page loaded");
  }, []);

  function markAsRead(id) {
    setReadIds([...readIds, id]);
  }

  if (data.loading) {
    return <p>Loading priority notifications...</p>;
  }

  if (data.error) {
    return <p className="error">Error: {data.error}</p>;
  }

  const sortedData = sortNotifications(data.notifications);
  const topNotifications = sortedData.slice(0, topCount);

  return (
    <section>
      <h2>Priority Notifications</h2>

      <label className="top-input">
        Top N:
        <input
          type="number"
          min="1"
          max="20"
          value={topCount}
          onChange={(event) => setTopCount(Number(event.target.value))}
        />
      </label>

      <NotificationList notifications={topNotifications} readIds={readIds} markAsRead={markAsRead} />
    </section>
  );
}

export default PriorityNotifications;
