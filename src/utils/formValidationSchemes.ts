import * as yup from "yup";
import { UserProfile } from "../types";

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

const validFileExtensions = ["jpg", "png", "jpeg"];

function isValidFileType(fileName: string) {
  const fileType = fileName.split(".").pop();

  if (!fileType) return true;

  return validFileExtensions.indexOf(fileType) > -1;
}

export const profileSchema: yup.ObjectSchema<UserProfile> = yup.object().shape({
  photoURL: yup
    .mixed()
    .optional()
    .test(
      "is-valid-type",
      "Not a valid image type, use JPEG or PNG.",
      (value) =>
        isValidFileType(
          value
            ? typeof value === "string"
              ? value
              : "name" in value
              ? (value.name as string)
              : ""
            : ""
        )
    ),
  displayName: yup.string().optional(),
  email: yup
    .string()
    .email("Email must be correct")
    .required("Email is required"),
});
