import * as yup from "yup";

export const create = yup.object().shape({
  name: yup.string().required(),
});
export const update = yup.object().shape({
  name: yup.string().required(),
});
