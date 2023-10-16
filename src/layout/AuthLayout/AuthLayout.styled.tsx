import { Box, Grid, GridProps, styled } from "@mui/material";
import LightThemeBgImage from "/auth-bg-light-theme.png";
import DarkThemeBgImage from "/auth-bg-dark-theme.png";

const AuthLayoutContainer = styled(Grid)<
  GridProps & { component: React.ElementType }
>({
  height: "100vh",
});

const FormGridContainer = styled(Grid)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  marginInline: "auto",
  paddingInline: theme.spacing(4),
  maxWidth: "26rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const BgImage = styled(Grid)(({ theme }) => ({
  backgroundImage: `url('${
    theme.palette.mode === "light" ? LightThemeBgImage : DarkThemeBgImage
  }')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "left bottom",
}));

export { BgImage, FormGridContainer, FormContainer, AuthLayoutContainer };
