import { Box, styled } from "@mui/material";

const CardContainer = styled(Box)({
  width: "600px",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  perspective: "1000px",
});

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
}));

const CardFaceFront = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "movingToLeft" && prop !== "movingToRight" && prop !== "index",
})<{
  movingToLeft?: boolean;
  movingToRight?: boolean;
  index?: number;
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
  transition: "border 200ms ease-in",

  ...(movingToLeft &&
    index === 0 && {
      borderColor: theme.palette.error.light,
    }),
  ...(movingToRight &&
    index === 0 && {
      borderColor: theme.palette.success.light,
    }),
}));

const CardFaceBack = styled(CardFaceFront)({
  transform: "rotateX(180deg)",
  wordBreak: "normal",
});

export { CardContainer, CardInnerContainer, CardFaceFront, CardFaceBack };
