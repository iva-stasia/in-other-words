import { Box, BoxProps, Paper, TableContainer, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const Container = styled(Box)<
  BoxProps & MotionProps & { component: React.ElementType }
>(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",

  [theme.breakpoints.down("sm")]: {
    height: "calc(100 - 56px)%",
  },
}));

const StyledTableContainer = styled(TableContainer)({
  height: "100%",
  overflow: "auto",
});

const StyledPaper = styled(Paper)({
  width: "100%",
  overflow: "hidden",
});

export { Container, StyledTableContainer, StyledPaper };
