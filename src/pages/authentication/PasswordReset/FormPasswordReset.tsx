import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UserEmail } from "../../../types";
import { emailSchema } from "../../../utils/formValidationSchemes";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleResetEmail } from "../../../store/slices/passwordResetSlice";
import AlertMessage from "../../../components/AlertMessage";
import ButtonLarge from "../../../components/ButtonLarge";

const FormPasswordReset = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<UserEmail>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(emailSchema),
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!errorMessage) {
      dispatch(toggleResetEmail(isSubmitted));
    }
  }, [isSubmitted, errorMessage, dispatch]);

  const onSubmit: SubmitHandler<UserEmail> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        const message = error.message.includes("auth/user-not-found")
          ? "Invalid email"
          : "Ops! Something went wrong. Please try again later.";
        setErrorMessage(message);
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      marginTop={4}
      sx={{ width: "100%" }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
            <FormLabel htmlFor="email" sx={{ color: "text.primary" }}>
              Email Address
            </FormLabel>
            <OutlinedInput
              id="email"
              type="email"
              placeholder="Your email"
              size="small"
              autoComplete="email"
              {...field}
            />
            <FormHelperText error sx={{ mx: 0 }}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        )}
      />

      <AlertMessage
        alertOpen={error}
        setAlertOpen={setError}
        message={errorMessage}
        severity="error"
      />

      <ButtonLarge title="Send" disabled={isSubmitting} />
    </Box>
  );
};

export default FormPasswordReset;
