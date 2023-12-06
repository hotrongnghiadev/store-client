import adminClient from "./axios/adminClient.axios";
import memberClient from "./axios/memberClient.axios";
import publicAxios from "./axios/publicClient.axios";

const userApi = {
  signin(body) {
    const url = "user/signin";
    return publicAxios.post(url, body);
  },
  signup(body) {
    const url = "user/signup";
    return publicAxios.post(url, body);
  },
  updateCart(body) {
    const url = "user/updateCart";
    return memberClient.patch(url, body);
  },
  getMember() {
    const url = `user/current`;
    return memberClient.get(url);
  },
  getAdmin() {
    const url = `user/current`;
    return adminClient.get(url);
  },
};

export default userApi;
