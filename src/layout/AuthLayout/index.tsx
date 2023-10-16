import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { saveUser } from "../../store/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import {
  AuthLayoutContainer,
  BgImage,
  FormContainer,
  FormGridContainer,
} from "./AuthLayout.styled";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
        navigate("/");
      } else {
        dispatch(saveUser(null));
      }
    });
  }, [dispatch, navigate]);

  return (
    <AuthLayoutContainer container component="main">
      <FormGridContainer item xs={12} sm={8} md={5}>
        <FormContainer>
          <Typography
            component="span"
            variant="h5"
            color="primary"
            fontFamily="Kavoon"
            mb={4}
          >
            In Other Words
          </Typography>
          <Outlet />
        </FormContainer>
        <ColorModeSwitch />
      </FormGridContainer>
      <BgImage item xs={false} sm={4} md={7} />
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
