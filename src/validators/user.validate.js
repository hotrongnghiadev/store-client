import * as yup from "yup";

export const signin = yup.object().shape({
  userName: yup.string().required().min(6),
  password: yup.string().required().min(6),
});

export const signup = yup.object().shape({
  userName: yup.string().required().min(6),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf(
      [yup.ref("password"), null],
      "The re-entered password does not match",
    ),
});
