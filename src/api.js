//export const API_BASE_URL = "http://localhost:5000";

export const API_BASE_URL = "https://jc20pgnt-5000.use2.devtunnels.ms";

export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads/`;

async function request(url, method = "GET", data = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const responseData = await response.json();
    console.log("API response:", responseData);
    return responseData;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const get = (url, token = null) => request(url, "GET", null, token);
export const post = (url, data, token = null) =>
  request(url, "POST", data, token);
export const put = (url, data, token = null) =>
  request(url, "PUT", data, token);
export const del = (url, token = null) => request(url, "DELETE", null, token);
