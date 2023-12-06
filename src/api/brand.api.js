import adminClient from "./axios/adminClient.axios";
import publicAxios from "./axios/publicClient.axios";

const brandApi = {
  create(data) {
    const url = "brand/create";
    return adminClient.post(url, data);
  },
  update(id, data) {
    const url = `brand/update/${id}`;
    return adminClient.put(url, data);
  },
  getAll() {
    const url = "brand/getAll";
    return publicAxios.get(url);
  },
  delMany(data) {
    const url = "brand/delMany/";
    return adminClient.delete(url, { params: data });
  },
};

export default brandApi;
