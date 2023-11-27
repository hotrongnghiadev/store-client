import axios from "axios";
import queryString from "query-string";

const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

privateAxios.interceptors.request.use(
  async (config) => {
    const admin = localStorage.getItem("persist:admin");
    if (admin && typeof admin === "string") {
      const adminJSON = JSON.parse(admin);
      const data = JSON.parse(adminJSON?.data);
      return {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.accessToken}`,
        },
      };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err.response);
  },
);

export default privateAxios;
