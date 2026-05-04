const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpc2hlay4yNjQyMUBnZ25pbmRhLmRyb25hY2hhcnlhLmluZm8iLCJleHAiOjE3Nzc4NzI3MTksImlhdCI6MTc3Nzg3MTgxOSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImI5ODNlM2I1LTNlYjAtNDZiNy05NGE4LTE1YTMwNmM0YjlmMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFiaGlzaGVrIiwic3ViIjoiZTE3YjM3ZmUtZTVkNS00ZGM0LTk2YjMtODNiN2E5MjYxN2NmIn0sImVtYWlsIjoiYWJoaXNoZWsuMjY0MjFAZ2duaW5kYS5kcm9uYWNoYXJ5YS5pbmZvIiwibmFtZSI6ImFiaGlzaGVrIiwicm9sbE5vIjoiMjY0MjEiLCJhY2Nlc3NDb2RlIjoidWtzZFdUIiwiY2xpZW50SUQiOiJlMTdiMzdmZS1lNWQ1LTRkYzQtOTZiMy04M2I3YTkyNjE3Y2YiLCJjbGllbnRTZWNyZXQiOiJkamZNWllSVmd1V0tOQ2NWIn0.hQW9vlNMLKjtnPzgf0Kwe061dFB6UzMtRwWWpURmDGs";

async function Log(stack, level, package, message) {
  try {
    const allowedStacks = ["backend", "frontend"];
    const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
    const allowedPackages = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service", "api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];

    if (!allowedStacks.includes(stack)) {
      console.log("Wrong stack value");
      return;
    }

    if (!allowedLevels.includes(level)) {
      console.log("Wrong level value");
      return;
    }

    if (!allowedPackages.includes(package)) {
      console.log("Wrong package value");
      return;
    }

    const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: package,
        message: message
      })
    });

    console.log("Log sent:", message);

    if (!response.ok) {
      console.log("Log API problem:", response.status);
    }
  } catch (error) {
    console.log("Could not send log:", error.message);
  }
}

module.exports = Log;
