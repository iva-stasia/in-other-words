import { Box, Card, CardContent, styled } from "@mui/material";

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop != "active" && prop !== "main",
})<{ active: boolean; main: boolean }>(({ active, main, theme }) => ({
  position: "relative",
  height: 200,

  ...(!active && {
    opacity: 0.6,
    pointerEvents: "none",
  }),
  ...(main && {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23${
      theme.palette.mode === "dark" ? "242629" : "d1d1e9"
    }' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  }),

  [theme.breakpoints.down("sm")]: {
    height: 160,
  },

  "&:hover > .MuiBox-root": {
    scale: "1.1",
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
  shouldForwardProp: (prop) =>
    prop !== "iconLight" && prop !== "iconDark" && prop !== "main",
})<{ iconLight: string; iconDark: string; main: boolean }>(
  ({ theme, iconLight, iconDark, main }) => ({
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
    transition: theme.transitions.create(["opacity", "scale"]),
    ...(theme.palette.mode === "dark" && {
      backgroundImage: `url(${iconDark})`,
    }),
    ...(main && {
      height: "100%",
      width: "100%",
      right: 20,
      bottom: 0,
      backgroundSize: "auto 120%",
    }),
  })
);

export { StyledCard, StyledCardContent, BgImage };
