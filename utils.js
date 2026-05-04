function getPriorityValue(type) {
  if (type === "Placement") {
    return 3;
  }

  if (type === "Result") {
    return 2;
  }

  if (type === "Event") {
    return 1;
  }

  return 0;
}

function sortNotifications(notifications) {
  notifications.sort(function (a, b) {
    const firstPriority = getPriorityValue(a.type);
    const secondPriority = getPriorityValue(b.type);

    if (firstPriority !== secondPriority) {
      return secondPriority - firstPriority;
    }

    const firstTime = new Date(a.timestamp).getTime();
    const secondTime = new Date(b.timestamp).getTime();

    return secondTime - firstTime;
  });

  return notifications;
}

module.exports = sortNotifications;
