import adminClient from "./axios/adminClient.axios";
import memberClient from "./axios/memberClient.axios";
import publicAxios from "./axios/publicClient.axios";

const productApi = {
  create(data) {
    const url = "product/create";
    return adminClient.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  update(data, id) {
    const url = `product/update/${id}`;
    return adminClient.put(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  delMany(data) {
    const url = "product/delMany/";
    return adminClient.delete(url, { params: data });
  },
  getAll() {
    const url = "product/get-all";
    return publicAxios.get(url);
  },
  getOne(slug) {
    const url = `product/get-one/${slug}`;
    return publicAxios.get(url);
  },
  getOneById(id) {
    const url = `product/get-one-by-id/${id}`;
    return publicAxios.get(url);
  },
  filter(query) {
    const url = `product/filter`;
    return publicAxios.get(url, { params: query });
  },
  rate(data, id) {
    const url = `product/rate/${id}`;
    return memberClient.patch(url, data);
  },
};

export default productApi;
