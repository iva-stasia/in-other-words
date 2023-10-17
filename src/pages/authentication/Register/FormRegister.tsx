import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegisterInput } from "../../../types";
import { registerSchema } from "../../../utils/authFormValidationSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import AlertMessage from "../../../components/AlertMessage";
import ButtonLarge from "../../../components/ButtonLarge";

const FormRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<UserRegisterInput> = async ({
    email,
    password,
  }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "userWords", res.user.uid), {});
      await setDoc(doc(db, "userSets", res.user.uid), {});
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        const message = error.message.includes("auth/email-already-in-use")
          ? "This email has already been register"
          : "Ops! Something went wrong. Please try again later.";
        setErrorMessage(message);
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        marginTop={1}
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <FormLabel htmlFor="password" sx={{ color: "text.primary" }}>
                Password
              </FormLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Min. 8 characters"
                size="small"
                {...field}
              />
              <FormHelperText error sx={{ mx: 0 }}>
                {errors.password?.message}
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

        <ButtonLarge title="Sign Up" disabled={isSubmitting} />
      </Box>
    </>
  );
};

export default FormRegister;