import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://your-api.com",
  timeout: 10000,
});

// Add token automatically
axiosClient.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
const token = '';
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle refresh token / global errors
axiosClient.interceptors.response.use(
  res => res,
  async error => {
    // handle 401, refresh, logout etc.
    return Promise.reject(error);
  }
);

export default axiosClient;
