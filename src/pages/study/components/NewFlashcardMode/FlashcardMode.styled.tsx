import {
  Box,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";

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
  transition: "opacity 0.1s ease-in-out",
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
    height: "calc(100vh - 208px)",
    marginTop: theme.spacing(4),
  },
}));

const CommonCardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ index }) => ({
  display: "inline-block",
  position: "absolute",
  top: 0,
  transition: "all 0.3s ease-in-out",
  zIndex: `${10 - index}`,
  opacity: `${(5 - index) / 5}`,
  transform: `scale(${(30 - index) / 30}) translateY(-${8 * index}px)`,
  transformOrigin: "top",
  ...(index === 1 && {
    opacity: 1,
  }),
}));

const CurrentCardContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "translateX" &&
    prop !== "movingToLeft" &&
    prop !== "movingToRight" &&
    prop !== "isDragging",
})<{
  translateX: number;
  movingToLeft: boolean;
  movingToRight: boolean;
  isDragging: boolean;
}>(({ translateX, isDragging }) => ({
  borderRadius: "8px",
  cursor: "pointer",

  transform: `translateX(${translateX}px)`,
  rotate: `${translateX / 30}deg`,
  transition: "all 200ms ease-in-out",
  transformOrigin: "bottom center",

  ...(!isDragging && {
    transform: "translateX(0px)",
    rotate: "0deg",
  }),
  ...(isDragging && {
    cursor: "grabbing",
    transition: "none",
  }),
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.default,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export {
  FailBtn,
  PassBtn,
  Container,
  CardContainer,
  CommonCardContainer,
  CurrentCardContainer,
  BtnContainer,
  BorderLinearProgress,
};
