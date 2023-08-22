import { Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useEffect } from "react";

const PasswordResetSent = () => {
  const isResetEmailSent = useSelector(
    (state: RootState) => state.passwordReset.isResetEmailSent
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isResetEmailSent) {
      navigate(-1);
    }
  }, [isResetEmailSent, navigate]);

  return (
    <>
      {isResetEmailSent && (
        <>
          <Typography component="h1" variant="h5">
            Check your email
          </Typography>
          <Typography component="p" variant="body1" align="center" m={2}>
            An email has been sent to your email to reset your password.
          </Typography>
          <Link component={RouterLink} to={"/login"} variant="body2">
            {"Back to Sign in"}
          </Link>
        </>
      )}
    </>
  );
};

export default PasswordResetSent;
