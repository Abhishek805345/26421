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
    const firstType = a.Type || a.type;
    const secondType = b.Type || b.type;
    const firstTimestamp = a.Timestamp || a.timestamp;
    const secondTimestamp = b.Timestamp || b.timestamp;

    const firstPriority = getPriorityValue(firstType);
    const secondPriority = getPriorityValue(secondType);

    if (firstPriority !== secondPriority) {
      return secondPriority - firstPriority;
    }

    const firstTime = new Date(firstTimestamp).getTime();
    const secondTime = new Date(secondTimestamp).getTime();

    return secondTime - firstTime;
  });

  return notifications;
}

module.exports = sortNotifications;
