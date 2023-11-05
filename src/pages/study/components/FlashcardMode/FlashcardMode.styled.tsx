import { Box, IconButton, styled } from "@mui/material";
import { motion } from "framer-motion";

const FailBtn = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.light,
  backgroundColor: `${theme.palette.error.light}20`,
  border: "2px solid",
  borderColor: theme.palette.error.light,
  "&:disabled": {
    borderColor: theme.palette.action.disabled,
  },
  "&:hover": {
    backgroundColor: `${theme.palette.error.light}40`,
  },
}));

const PassBtn = styled(FailBtn)(({ theme }) => ({
  color: theme.palette.success.light,
  backgroundColor: `${theme.palette.success.light}20`,
  borderColor: theme.palette.success.light,
  "&:hover": {
    backgroundColor: `${theme.palette.success.light}40`,
  },
}));

const BtnContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  marginInline: "auto",
  width: "600px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
  position: "relative",
  userSelect: "none",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  position: "relative",
  height: "400px",
  width: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  zIndex: 1,

  [theme.breakpoints.down("sm")]: {
    height: "calc(100svh - 208px)",
    marginTop: theme.spacing(4),
  },
}));

const CommonCardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ index }) => ({
  display: "inline-block",
  position: "absolute",
  top: 0,
  zIndex: `${10 - index}`,
  opacity: `${(5 - index) / 5}`,
  transform: `scale(${(30 - index) / 30}) translateY(-${8 * index}px)`,
  transition: "all 0.2s linear",
  transitionDelay: "0.2s",
  transformOrigin: "top",
  ...(index === 1 && {
    opacity: 1,
  }),
}));

const CurrentCardContainer = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transformOrigin: "top",
  touchAction: "none",
}));

const BtnProgressContainer = styled(motion.div)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
  alignItems: "center",
}));

export {
  FailBtn,
  PassBtn,
  Container,
  CardContainer,
  CommonCardContainer,
  CurrentCardContainer,
  BtnContainer,
  BtnProgressContainer,
};
