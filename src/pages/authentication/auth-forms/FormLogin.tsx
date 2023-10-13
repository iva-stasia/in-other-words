import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Link,
  Typography,
  Stack,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserLoginInput } from "../../../types";
import { loginSchema } from "../validationSchema";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { Link as RouterLink } from "react-router-dom";
import AlertMessage from "../../../components/AlertMessage";

const FormLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginInput>({
    defaultValues: {
      email: "user@gmail.com",
      password: "user1234!",
      remember: true,
    },
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
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

  const onSubmit: SubmitHandler<UserLoginInput> = async ({
    email,
    password,
    remember,
  }) => {
    try {
      if (!remember) {
        await setPersistence(auth, browserSessionPersistence);
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        const message =
          error.message.includes("auth/wrong-password") ||
          error.message.includes("auth/user-not-found")
            ? "Email or password was invalid"
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
                placeholder="Your password"
                size="small"
                {...field}
              />
              <FormHelperText error sx={{ mx: 0 }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    size="small"
                    checked={field.value}
                    {...field}
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
            )}
          />
          <Link component={RouterLink} to={"/password-reset"} variant="body2">
            Forgot password?
          </Link>
        </Stack>
        <AlertMessage
          alertOpen={error}
          setAlertOpen={setError}
          message={errorMessage}
          severity="error"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default FormLogin;
