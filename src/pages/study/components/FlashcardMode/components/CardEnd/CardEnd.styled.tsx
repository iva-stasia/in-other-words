import { Box, styled } from "@mui/material";

const CardEndContainer = styled(Box)(({ theme }) => ({
  height: "400px",
  width: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "2px solid",
  borderColor: `${theme.palette.primary.main}20`,
}));

export { CardEndContainer };
