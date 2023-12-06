import * as yup from "yup";

export const create = yup.object().shape({
  name: yup.string().required(),
  brandId: yup.string().required(),
  categoryId: yup.string().required(),
  general: yup.array().of(
    yup.object().required().shape({
      name: yup.string().required(),
      content: yup.string().required(),
    }),
  ),
  price: yup.string().required(),
  inventory: yup.string().required(),
  color: yup.string().required(),
  detail: yup.array().of(
    yup.object().required().shape({
      name: yup.string().required(),
      content: yup.string().required(),
    }),
  ),
  thumb: yup.mixed().test("required", "thumb field is required", (value) => {
    return value && value.length;
  }),
  images: yup.mixed().test("required", "images field is required", (value) => {
    return value && value.length;
  }),
});

export const update = yup.object().shape({
  name: yup.string().required(),
  brandId: yup.string().required(),
  categoryId: yup.string().required(),
  general: yup.array().of(
    yup.object().required().shape({
      name: yup.string().required(),
      content: yup.string().required(),
    }),
  ),
  price: yup.string().required(),
  inventory: yup.string().required(),
  color: yup.string().required(),
  detail: yup.array().of(
    yup.object().required().shape({
      name: yup.string().required(),
      content: yup.string().required(),
    }),
  ),
});

export const rate = yup.object().shape({
  star: yup.number().typeError("Trường này bắt buộc").min(1).max(5),
});
