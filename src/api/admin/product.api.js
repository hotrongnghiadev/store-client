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
};

export default productApi;
