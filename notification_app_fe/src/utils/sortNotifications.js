function getPriority(type) {
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
  const copiedNotifications = [...notifications];

  copiedNotifications.sort(function (a, b) {
    const firstType = a.Type || a.type;
    const secondType = b.Type || b.type;
    const firstTimestamp = a.Timestamp || a.timestamp;
    const secondTimestamp = b.Timestamp || b.timestamp;

    const firstPriority = getPriority(firstType);
    const secondPriority = getPriority(secondType);

    if (firstPriority !== secondPriority) {
      return secondPriority - firstPriority;
    }

    return new Date(secondTimestamp).getTime() - new Date(firstTimestamp).getTime();
  });

  return copiedNotifications;
}

export default sortNotifications;
