import { Box, Grid, Typography, styled } from "@mui/material";
import badgeLight from "/achievements/badge-light.png";
import badgeDark from "/achievements/badge-dark.png";

const AchievementsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  justifyContent: "space-between",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

const BadgeContainer = styled(Grid)(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: `top center / contain no-repeat url(${
    theme.palette.mode === "dark" ? badgeDark : badgeLight
  })`,

  "&:hover": {
    cursor: "pointer",
  },

  "&:hover h6::before": {
    opacity: 1,
  },
}));

const BadgeTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "requiredNum" && prop !== "type",
})<{ requiredNum: number; type: string }>(({ theme, requiredNum, type }) => ({
  position: "relative",
  padding: theme.spacing(1),
  borderRadius: "100px",
  flex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: theme.palette.mode === "dark" ? "#444649" : "#E4E4F1",

  "&::before": {
    content: `"${requiredNum} ${type}"`,
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100px",
    backgroundColor: theme.palette.mode === "dark" ? "#444649" : "#E4E4F1",
    opacity: 0,
    transition: theme.transitions.create("opacity"),
  },

  "&:hover::before": {
    opacity: 1,
    cursor: "pointer",
  },
}));

export { AchievementsContainer, BadgeContainer, BadgeTitle };
