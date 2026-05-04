const fetchNotifications = require("./fetch");
const sortNotifications = require("./utils");
const Log = require("./log");

async function main() {
  try {
    console.log("App started");
    await Log("frontend", "info", "page", "App starts");

    const notifications = await fetchNotifications();
    console.log("Total notifications:", notifications.length);

    console.log("Sorting notifications...");
    await Log("frontend", "info", "utils", "Before sorting");

    const sortedNotifications = sortNotifications(notifications);

    console.log("Sorting completed");
    await Log("frontend", "info", "utils", "After sorting");

    const topTen = sortedNotifications.slice(0, 10);

    console.log("Top 10 notifications:");
    console.log(topTen);
  } catch (error) {
    console.log("Something went wrong:", error.message);
    await Log("frontend", "error", "page", "Error occurs: " + error.message);
  }
}

main();
