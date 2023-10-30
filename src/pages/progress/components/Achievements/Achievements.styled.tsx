import { Box, styled } from "@mui/material";

const AchievementsContainer = styled(Box)(({ theme }) => ({
  //   height: "100%",
  //   maxHeight: "400px",
  flex: 1,
  padding: theme.spacing(2),
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

export { AchievementsContainer };
