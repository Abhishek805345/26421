import { useEffect, useState } from "react";
import getNotifications from "../api/notifications.js";
import { Log } from "../api/log.js";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(function () {
    async function loadNotifications() {
      try {
        console.log("Loading notifications in hook");
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        console.log("Error in hook:", err.message);
        setError(err.message);
        await Log("frontend", "error", "hook", "Error loading notifications");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return {
    notifications: notifications,
    loading: loading,
    error: error
  };
}

export default useNotifications;
