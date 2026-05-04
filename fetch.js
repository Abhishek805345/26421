const Log = require("./log");

const apiUrl = "http://20.207.122.201/evaluation-service/notifications";

async function fetchNotifications() {
  console.log("Going to fetch notifications...");
  await Log("frontend", "info", "api", "Before fetching API");

  const response = await fetch(apiUrl);

  if (!response.ok) {
    await Log("frontend", "error", "api", "API fetch failed");
    throw new Error("API error: " + response.status);
  }

  const data = await response.json();
  console.log("Notifications fetched");
  await Log("frontend", "info", "api", "After fetching API");

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.notifications)) {
    return data.notifications;
  }

  return [];
}

module.exports = fetchNotifications;
