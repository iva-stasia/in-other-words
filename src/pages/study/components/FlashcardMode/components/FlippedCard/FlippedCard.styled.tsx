import { Box, Typography, styled } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  width: "600px",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  perspective: "1000px",

  [theme.breakpoints.down("sm")]: {
    width: "calc(100vw - 48px)",
    height: "calc(100vh - 208px)",
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

const CardFaceFront = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "movingToLeft" && prop !== "movingToRight" && prop !== "index",
})<{
  movingToLeft: boolean;
  movingToRight: boolean;
  index: number;
}>(({ theme, movingToLeft, movingToRight, index }) => ({
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
  transition: "border 200ms ease-in-out",

  ...(movingToLeft &&
    index === 0 && {
      borderColor: theme.palette.error.light,
    }),
  ...(movingToRight &&
    index === 0 && {
      borderColor: theme.palette.success.light,
    }),
}));

const CardFaceBack = styled(CardFaceFront)(({ theme }) => ({
  transform: "rotateX(180deg)",
  wordBreak: "normal",

  [theme.breakpoints.down("sm")]: {
    transform: "rotateY(180deg)",
  },
}));

const TypographyMain = styled(Typography, {
  shouldForwardProp: (prop) =>
    prop !== "movingToLeft" && prop !== "movingToRight",
})<{
  movingToLeft: boolean;
  movingToRight: boolean;
}>(({ movingToLeft, movingToRight, theme }) => ({
  padding: theme.spacing(3),
  opacity: `${movingToLeft || movingToRight ? 0 : 1}`,
  transition: "opacity 200ms ease-in-out",
}));

const TypographyProgress = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "direction" && prop !== "color",
})<{
  direction: boolean;
  color: string;
}>(({ direction, color, theme }) => ({
  padding: theme.spacing(3),
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: `${direction ? 1 : 0}`,
  transition: "opacity 200ms ease-in-out",
  color: `${
    color === "error" ? theme.palette.error.light : theme.palette.success.light
  }`,
}));

const AudioContainer = styled(TypographyMain)(({ theme }) => ({
  padding: theme.spacing(0),
}));

export {
  CardContainer,
  CardInnerContainer,
  CardFaceFront,
  CardFaceBack,
  TypographyMain,
  TypographyProgress,
  AudioContainer,
};
