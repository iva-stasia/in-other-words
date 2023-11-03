import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const ProgressContainer = styled(Box)<
  BoxProps & MotionProps & { component: React.ElementType }
>(({ theme }) => ({
  overflow: "auto",
  marginTop: theme.spacing(2),
  height: "100%",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(2),
  },

  [theme.breakpoints.down("sm")]: {
    overflow: "initial",
    height: "calc(100% - 56px)",
  },
}));

const Row = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  gap: theme.spacing(3),
  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(2),
  },
}));

export { ProgressContainer, Row };
