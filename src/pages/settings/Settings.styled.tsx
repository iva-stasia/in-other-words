import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const Container = styled(Box)<
  BoxProps & MotionProps & { component: React.ElementType }
>(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  overflow: "auto",
  marginTop: theme.spacing(2),
  height: "100%",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  minHeight: "400px",
  maxWidth: "800px",
  width: "80%",
  marginInline: "auto",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    minHeight: "100%",
    maxWidth: "100%",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.backgroundSecond.main,
    padding: theme.spacing(0),
  },
}));

export { Container, InnerContainer };
