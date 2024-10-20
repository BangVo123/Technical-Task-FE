const API_URL = "http://localhost:3047/api/v1";

export const post = async (path, data) => {
  return await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const get = async (path) => {
  const token = localStorage.getItem("token");
  return await fetch(`${API_URL}${path}`, {
    headers: {
      token,
    },
  });
};
