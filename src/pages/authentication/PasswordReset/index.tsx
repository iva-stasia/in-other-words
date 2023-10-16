import { Link, Typography } from "@mui/material";
import FormPasswordReset from "./FormPasswordReset";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const PasswordReset = () => {
  const isResetEmailSent = useSelector(
    (state: RootState) => state.passwordReset.isResetEmailSent
  );

  return (
    <>
      {!isResetEmailSent ? (
        <>
          <Typography component="h1" variant="h5">
            Forgot your password?
          </Typography>
          <Typography component="p" variant="body1" align="center" mt={2}>
            Enter your email address below and we'll send you a link to reset
            your password.
          </Typography>
          <FormPasswordReset />
        </>
      ) : (
        <>
          <Typography component="h1" variant="h5">
            Check your email
          </Typography>
          <Typography component="p" variant="body1" align="center" m={2}>
            An email has been sent to your email to reset your password.
          </Typography>
        </>
      )}
      <Link component={RouterLink} to={"/login"} variant="body2">
        {"Back to Sign in"}
      </Link>
    </>
  );
};

export default PasswordReset;
