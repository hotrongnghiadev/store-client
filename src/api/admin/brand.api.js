import privateAxios from "../axios/private.axios";

const brandApi = {
  create(data) {
    const url = "brand/create";
    return privateAxios.post(url, data);
  },
  update(id, data) {
    const url = `brand/update/${id}`;
    return privateAxios.put(url, data);
  },
  getAll() {
    const url = "brand/getAll";
    return privateAxios.get(url);
  },
  delMany(data) {
    const url = "brand/delMany/";
    return privateAxios.delete(url, { params: data });
  },
};

export default brandApi;
