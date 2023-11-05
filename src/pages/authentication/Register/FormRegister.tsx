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
import { registerSchema } from "../../../utils/formValidationSchemes";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import AlertMessage from "../../../components/AlertMessage";
import ButtonLarge from "../../../components/ButtonLarge";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../store/slices/userSlice";

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
  const dispatch = useDispatch();

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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const avatar = user.photoURL
        ? user.photoURL
        : `https://api.dicebear.com/7.x/big-ears/svg?seed=${new Date().getMilliseconds()}`;

      try {
        await updateProfile(user, {
          photoURL: avatar,
        });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: avatar,
          activityLog: [Timestamp.now()],
          lastLoginDate: Timestamp.now(),
        });
      } catch (error) {
        setError(true);
        const message = "Ops! Something went wrong. Please try again later.";
        setErrorMessage(message);
      }

      await setDoc(doc(db, "userWords", user.uid), {});
      await setDoc(doc(db, "userSets", user.uid), {});
      await setDoc(doc(db, "userLearningLog", user.uid), {});

      dispatch(saveUser(user));
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

        <ButtonLarge title="Sign Up" isSubmitting={isSubmitting} />
      </Box>
    </>
  );
};

export default FormRegister;
