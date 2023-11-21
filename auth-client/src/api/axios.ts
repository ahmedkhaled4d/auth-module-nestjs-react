import axios from "axios";
const BASE_URL = "http://localhost:3000";

const refreshAccessToken = async () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "");
  const resposne = await axiosApiInstance.get("/auth/refresh", {
    headers: { Authorization: ` bearer ${user.refreshToken}` },
  });
  localStorage.setItem("user", JSON.stringify(resposne.data));
};
export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user) {
      config.headers["Authorization"] = ` bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
