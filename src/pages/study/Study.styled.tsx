import { Box, Card, CardContent, styled } from "@mui/material";

const StyledCard = styled(Card)<{ wordnum: number }>(({ wordnum }) => ({
  position: "relative",
  height: 200,
  cursor: "pointer",
  ...(!wordnum && {
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

const BgImage = styled(Box)<{ icon: string }>(({ theme, icon }) => ({
  position: "absolute",
  right: 20,
  bottom: 0,
  height: "100%",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${icon})`,
  backgroundSize: "auto 60%",
  backgroundPosition: "right",
  transformOrigin: "center right",
  opacity: "0.4",
  transition: theme.transitions.create(["opacity", "scale"]),
}));

export { StyledCard, StyledCardContent, BgImage };
