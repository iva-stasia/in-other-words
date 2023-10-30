import { Box, styled } from "@mui/material";

const TotalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.down("md")]: {
    flex: "1 1 100%",
    flexDirection: "row",
  },

  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%",
    flexDirection: "column",
  },
}));

const TotalCell = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

export { TotalContainer, TotalCell };
