import * as yup from "yup";

export const signin = yup.object().shape({
  userName: yup.string().required().min(6),
  password: yup.string().required().min(6),
});
