// auth.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("userToken");
    if (accessToken) {
      config.headers.token = accessToken;
    } else {
      delete config.headers.token; // Ensure token is removed if absent
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (username, password) => {
  return axiosInstance.post("/login", { username, password })
    .then((response) => {
      if (response.data.token) {
        sessionStorage.setItem("userToken", response.data.token);
        return true; // Login successful
      } else {
        return false; // Login failed
      }
    })
    .catch((error) => {
      console.error("Error occurred during login:", error);
      return false; // Login failed
    });
};

export const logout = () => {
  sessionStorage.removeItem("userToken");
};
