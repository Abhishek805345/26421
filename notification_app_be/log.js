let token = "";
const config = require("./config");
const API_BASE_URL = config.API_BASE_URL;
const authDetails = config.authDetails;

async function getToken() {
  if (token !== "") {
    return token;
  }

  const response = await fetch(API_BASE_URL + "/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authDetails)
  });

  if (!response.ok) {
    throw new Error("Token API error: " + response.status);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("Token not found in response");
  }

  token = data.access_token;
  console.log("New token received");

  return token;
}

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

    const accessToken = await getToken();

    const response = await fetch(API_BASE_URL + "/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: package,
        message: message
      })
    });

    if (response.ok) {
      console.log("Log sent:", message);
    } else {
      console.log("Log API problem:", response.status);
    }
  } catch (error) {
    console.log("Could not send log:", error.message);
  }
}

module.exports = {
  Log: Log,
  getToken: getToken
};
