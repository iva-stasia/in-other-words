import { Box, Paper, TableContainer, styled } from "@mui/material";

const Container = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const StyledTableContainer = styled(TableContainer)({
  height: "100%",
  overflow: "auto",
});

const StyledPaper = styled(Paper)({
  width: "100%",
  overflow: "hidden",
});

export { Container, StyledTableContainer, StyledPaper };
