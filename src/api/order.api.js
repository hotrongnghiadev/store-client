import adminClient from "./axios/adminClient.axios";
import memberClient from "./axios/memberClient.axios";
const orderApi = {
  create(data) {
    const url = "order/create";
    return memberClient.post(url, data);
  },
  getAll() {
    const url = "order/get-all";
    return adminClient.get(url);
  },
  getByUser() {
    const url = "order/get-by-user";
    return memberClient.get(url);
  },
};

export default orderApi;
