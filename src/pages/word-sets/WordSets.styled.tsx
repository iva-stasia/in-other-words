import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const WordSetsContainer = styled(Box)<
  BoxProps & MotionProps & { component: React.ElementType }
>(({ theme }) => ({
  marginTop: theme.spacing(2),
  overflow: "auto",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    overflow: "initial",
    height: "calc(100 - 56px)%",
  },
}));

export { WordSetsContainer };
