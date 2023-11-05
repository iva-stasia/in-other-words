import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../../../../../../utils/formValidationSchemes";
import { UserRegisterInput } from "../../../../../../types";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import AlertMessage from "../../../../../../components/AlertMessage";
import GoogleIcon from "/google.svg";
import { provider } from "../../../../../../firebase";
import BtnLoader from "../../../../../../components/BtnLoader";

interface ConfirmDialogProps {
  reauth: boolean;
  setReauth: (reauth: boolean) => void;
  currentUser: User;
  deleteUserAndData: () => Promise<void>;
}

const ConfirmDialog = ({
  reauth,
  setReauth,
  currentUser,
  deleteUserAndData,
}: ConfirmDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterInput>({
    defaultValues: {
      email: currentUser.email || "user@gmail.com",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<UserRegisterInput> = async ({ password }) => {
    if (!currentUser || !currentUser.email) return;

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    try {
      await reauthenticateWithCredential(currentUser, credential);
      await deleteUserAndData();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again later.");
      setAlertOpen(true);
      handleClose();
    }
  };

  const handleGoogle = async () => {
    try {
      await reauthenticateWithPopup(currentUser, provider);
      await deleteUserAndData();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again later.");
      setAlertOpen(true);
      handleClose();
    }
  };

  const handleClose = () => {
    setReauth(false);
  };

  return (
    <>
      <Dialog
        open={reauth}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm your password</DialogTitle>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{ my: 1 }}
                  variant="outlined"
                  required
                >
                  <FormLabel htmlFor="password" sx={{ color: "text.primary" }}>
                    Password
                  </FormLabel>
                  <OutlinedInput
                    id="password"
                    autoComplete="new-password"
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

            <Box sx={{ width: "100%" }}>
              <Divider>
                <Typography variant="body2">Or</Typography>
              </Divider>
            </Box>

            <Box sx={{ width: "100%", my: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                startIcon={
                  <img src={GoogleIcon} alt="Google" width={16} height={16} />
                }
                onClick={handleGoogle}
              >
                with Google
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Typography
                variant="button"
                sx={{ opacity: isSubmitting ? 0 : 1 }}
              >
                Confirm
              </Typography>
              {isSubmitting && <BtnLoader color="primary" />}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={message}
        severity="error"
      />
    </>
  );
};

export default ConfirmDialog;
