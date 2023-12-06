import adminClient from "./axios/adminClient.axios";
import publicAxios from "./axios/publicClient.axios";

const categoryApi = {
  create(data) {
    const url = "category/create";
    return adminClient.post(url, data);
  },
  update(id, data) {
    const url = `category/update/${id}`;
    return adminClient.put(url, data);
  },
  getAll() {
    const url = "category/getAll";
    return publicAxios.get(url);
  },
  delMany(data) {
    const url = "category/delMany/";
    return adminClient.delete(url, { params: data });
  },
};

export default categoryApi;
