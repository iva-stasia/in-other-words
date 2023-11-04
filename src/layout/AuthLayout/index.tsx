import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { saveUser } from "../../store/slices/userSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import {
  AuthLayoutContainer,
  BgImage,
  FormContainer,
  FormGridContainer,
} from "./AuthLayout.styled";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
        navigate("/");
      } else {
        dispatch(saveUser(null));
      }
    });
  }, []);

  return (
    <AuthLayoutContainer
      container
      component={motion.main}
      initial="hidden"
      whileInView="show"
      key={location.pathname}
    >
      <FormGridContainer
        item
        xs={12}
        sm={8}
        md={5}
        component={motion.div}
        variants={fadeIn("right", "tween", 0.2, 1)}
      >
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

      <BgImage
        item
        xs={false}
        sm={4}
        md={7}
        component={motion.div}
        variants={fadeIn("left", "tween", 0.2, 1)}
      />
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
