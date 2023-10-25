import { Box, styled } from "@mui/material";

const WordSetsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  overflow: "auto",
  borderRadius: "8px",
}));

export { WordSetsContainer };
