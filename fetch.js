const logFile = require("./log");
const Log = logFile.Log;
const token = logFile.token;
const isTokenExpired = logFile.isTokenExpired;

const apiUrl = "http://20.207.122.201/evaluation-service/notifications";

async function fetchNotifications() {
  console.log("Going to fetch notifications...");
  await Log("frontend", "info", "api", "Before fetching API");

  if (isTokenExpired()) {
    throw new Error("Token expired. Please add a new access token in log.js");
  }

  const response = await fetch(apiUrl, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

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
