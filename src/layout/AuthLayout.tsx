import { Typography, Grid, Paper, Box, useTheme } from "@mui/material";
import LightThemeBgImage from "../assets/images/auth-bg/auth-bg-light-theme.png";
import DarkThemeBgImage from "../assets/images/auth-bg/auth-bg-dark-theme.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { saveUser } from "../store/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../components/ColorModeSwitch";

const AuthLayout = () => {
  const theme = useTheme();
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
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        "& .MuiPaper-root": {
          transition: "all 300ms ease",
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: "auto",
            px: 4,
            maxWidth: "26rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
        </Box>
        <ColorModeSwitch />
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url('${
            theme.palette.mode === "light"
              ? LightThemeBgImage
              : DarkThemeBgImage
          }')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left bottom",
        }}
      />
    </Grid>
  );
};

export default AuthLayout;
