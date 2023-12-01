import privateAxios from "../axios/private.axios";

const productApi = {
  create(data) {
    const url = "product/create";
    return privateAxios.post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  update(data, id) {
    const url = `product/update/${id}`;
    return privateAxios.put(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  delMany(data) {
    const url = "product/delMany/";
    return privateAxios.delete(url, { params: data });
  },
  getAll() {
    const url = "product/get-all";
    return privateAxios.get(url);
  },
  getOne(id) {
    const url = `product/get-one/${id}`;
    return privateAxios.get(url);
  },
  filter(query) {
    const url = `product/filter`;
    return privateAxios.get(url, { params: query });
  },
};

export default productApi;
