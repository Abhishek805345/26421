import { API_BASE_URL, authDetails } from "./config.js";

let token = "";

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
    throw new Error("Token API error " + response.status);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("Token not found in response");
  }

  token = data.access_token;
  return token;
}

async function Log(stack, level, packageName, message) {
  try {
    const accessToken = await getToken();

    const response = await fetch(API_BASE_URL + "/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message
      })
    });

    if (response.ok) {
      console.log("Log sent:", message);
    } else {
      console.log("Log API problem:", response.status);
    }
  } catch (error) {
    console.log("Log error:", error.message);
  }
}

export { Log, getToken };
