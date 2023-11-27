import publicAxios from "../axios/public.axios";

const userApi = {
  signin(body) {
    const url = "user/signin";
    return publicAxios.post(url, body);
  },
};

export default userApi;
