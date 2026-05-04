import { Log, getToken } from "./log.js";
import { API_BASE_URL } from "./config.js";

async function getNotifications() {
  console.log("API call started");
  await Log("frontend", "info", "api", "Notifications API call started");
  const token = await getToken();

  const response = await fetch(API_BASE_URL + "/notifications", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (!response.ok) {
    await Log("frontend", "error", "api", "Notifications API error");
    throw new Error("API error " + response.status);
  }

  const data = await response.json();
  console.log("API data received");
  await Log("frontend", "info", "api", "Notifications API call completed");

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.notifications)) {
    return data.notifications;
  }

  return [];
}

export default getNotifications;
