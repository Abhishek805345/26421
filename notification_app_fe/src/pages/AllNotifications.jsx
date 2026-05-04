import React, { useEffect, useState } from "react";
import NotificationList from "../components/NotificationList.jsx";
import useNotifications from "../hooks/useNotifications.js";
import { Log } from "../api/log.js";

function AllNotifications() {
  const data = useNotifications();
  const [readIds, setReadIds] = useState([]);

  useEffect(function () {
    console.log("All notifications page opened");
    Log("frontend", "info", "page", "All notifications page loaded");
  }, []);

  function markAsRead(id) {
    setReadIds([...readIds, id]);
  }

  if (data.loading) {
    return <p>Loading notifications...</p>;
  }

  if (data.error) {
    return <p className="error">Error: {data.error}</p>;
  }

  return (
    <section>
      <h2>All Notifications</h2>
      <NotificationList notifications={data.notifications} readIds={readIds} markAsRead={markAsRead} />
    </section>
  );
}

export default AllNotifications;
