import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be correct")
    .required("Email is required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be correct")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-zA-Z]/, "Password requires a letter")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be correct")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-zA-Z]/, "Password requires a letter")
    .required("Password is required"),
  remember: yup.bool().required(),
});
