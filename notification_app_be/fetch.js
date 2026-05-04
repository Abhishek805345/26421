const logFile = require("./log");
const Log = logFile.Log;
const getToken = logFile.getToken;
const config = require("./config");

const apiUrl = config.API_BASE_URL + "/notifications";

async function fetchNotifications() {
  console.log("Going to fetch notifications...");
  await Log("frontend", "info", "api", "Before fetching API");

  const token = await getToken();

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
