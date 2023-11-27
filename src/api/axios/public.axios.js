import axios from "axios";
import queryString from "query-string";

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

publicAxios.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
  (err) => {
    return Promise.reject(err);
  },
);

publicAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err.response);
  },
);

export default publicAxios;
