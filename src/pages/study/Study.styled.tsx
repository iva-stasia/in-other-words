import { Box, Card, CardContent, styled } from "@mui/material";

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop != "active",
})<{ active: boolean }>(({ active }) => ({
  position: "relative",
  height: 200,
  cursor: "pointer",
  ...(!active && {
    opacity: 0.6,
  }),
  "&:hover > .MuiBox-root": {
    scale: "1.1",
    opacity: "0.8",
  },
}));

const StyledCardContent = styled(CardContent)({
  position: "relative",
  zIndex: "1",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const BgImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "iconLight" && prop !== "iconDark",
})<{ iconLight: string; iconDark: string }>(
  ({ theme, iconLight, iconDark }) => ({
    position: "absolute",
    right: 20,
    bottom: 0,
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${iconLight})`,
    backgroundSize: "auto 60%",
    backgroundPosition: "right",
    transformOrigin: "center right",
    opacity: "0.4",
    transition: theme.transitions.create(["opacity", "scale"]),
    ...(theme.palette.mode === "dark" && {
      backgroundImage: `url(${iconDark})`,
    }),
  })
);

export { StyledCard, StyledCardContent, BgImage };
