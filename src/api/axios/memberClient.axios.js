import axios from "axios";
import queryString from "query-string";

const memberClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  paramsSerializer: (params) => queryString.stringify(params),
  headers: {
    "Content-Type": "application/json",
  },
});

memberClient.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem("persist:member");
    if (user && typeof user === "string") {
      const userJSON = JSON.parse(user);
      const accessToken = JSON.parse(userJSON?.accessToken);
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

memberClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err.response);
  },
);

export default memberClient;
