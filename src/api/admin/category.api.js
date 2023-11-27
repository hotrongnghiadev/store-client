import privateAxios from "../axios/private.axios";

const categoryApi = {
  create(data) {
    const url = "category/create";
    return privateAxios.post(url, data);
  },
  update(id, data) {
    const url = `category/update/${id}`;
    return privateAxios.put(url, data);
  },
  getAll() {
    const url = "category/getAll";
    return privateAxios.get(url);
  },
  delMany(data) {
    const url = "category/delMany/";
    return privateAxios.delete(url, { params: data });
  },
};

export default categoryApi;
