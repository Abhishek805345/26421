import React, { useEffect, useState } from "react";
import FilterButtons from "../components/FilterButtons.jsx";
import NotificationList from "../components/NotificationList.jsx";
import useNotifications from "../hooks/useNotifications.js";
import { Log } from "../api/log.js";

function FilterNotifications() {
  const data = useNotifications();
  const [selectedType, setSelectedType] = useState("All");
  const [readIds, setReadIds] = useState([]);

  useEffect(function () {
    console.log("Filter page opened");
    Log("frontend", "info", "page", "Filter notifications page loaded");
  }, []);

  async function changeFilter(type) {
    console.log("Filter changed:", type);
    setSelectedType(type);
    await Log("frontend", "info", "component", "Filter changed to " + type);
  }

  function markAsRead(id) {
    setReadIds([...readIds, id]);
  }

  if (data.loading) {
    return <p>Loading notifications...</p>;
  }

  if (data.error) {
    return <p className="error">Error: {data.error}</p>;
  }

  const filteredNotifications = data.notifications.filter(function (notification) {
    const type = notification.Type || notification.type;

    if (selectedType === "All") {
      return true;
    }

    return type === selectedType;
  });

  return (
    <section>
      <h2>Filter Notifications</h2>
      <FilterButtons selectedType={selectedType} onFilterChange={changeFilter} />
      <NotificationList notifications={filteredNotifications} readIds={readIds} markAsRead={markAsRead} />
    </section>
  );
}

export default FilterNotifications;
