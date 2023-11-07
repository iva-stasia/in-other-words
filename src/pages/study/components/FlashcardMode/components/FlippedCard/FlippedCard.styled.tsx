import { Box, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";

const CardContainer = styled(Box)(({ theme }) => ({
  width: "600px",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  perspective: "1000px",

  [theme.breakpoints.down("sm")]: {
    width: "calc(100vw - 32px)",
    height: "calc(100svh - 208px)",
  },
}));

const CardInnerContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flipped",
})<{ flipped: boolean }>(({ flipped, theme }) => ({
  width: "100%",
  height: "100%",
  transition: "transform 1s",
  transformStyle: "preserve-3d",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  ...(flipped && {
    transform: "rotateX(-180deg)",
  }),

  [theme.breakpoints.down("sm")]: {
    ...(flipped && {
      transform: "rotateY(-180deg)",
    }),
  },
}));

const CardFaceFront = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "2px solid",
  borderColor: `${theme.palette.primary.main}20`,
  wordBreak: "break-all",
  hyphens: "auto",
}));

const CardFaceBack = styled(CardFaceFront)(({ theme }) => ({
  transform: "rotateX(180deg)",
  wordBreak: "normal",

  [theme.breakpoints.down("sm")]: {
    transform: "rotateY(180deg)",
  },
}));

const TypographyProgress = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>(({ color, theme }) => ({
  padding: theme.spacing(3),
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: `${
    color === "error" ? theme.palette.error.light : theme.palette.success.light
  }`,
  whiteSpace: "nowrap",
}));

export {
  CardContainer,
  CardInnerContainer,
  CardFaceFront,
  CardFaceBack,
  TypographyProgress,
};
