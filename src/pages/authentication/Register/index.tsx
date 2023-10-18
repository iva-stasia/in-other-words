import { Typography, Link, Divider, Box } from "@mui/material";
import AuthFirebaseGoogle from "../components/AuthFirebaseGoogle";
import { Link as RouterLink } from "react-router-dom";
import FormRegister from "./FormRegister";

const Register = () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <AuthFirebaseGoogle />
      <Box sx={{ width: "100%" }}>
        <Divider>
          <Typography variant="body2">Or</Typography>
        </Divider>
      </Box>
      <FormRegister />
      <Box>
        <Typography component="span" variant="body2">
          Already have an account?{" "}
        </Typography>
        <Link component={RouterLink} to={"/login"} variant="body2">
          {"Sign in"}
        </Link>
      </Box>
    </>
  );
};

export default Register;
