import { Box, BoxProps, styled } from "@mui/material";
import { MotionProps } from "framer-motion";

const ProgressContainer = styled(Box)<
  BoxProps & MotionProps & { component: React.ElementType }
>(({ theme }) => ({
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  overflow: "auto",
  borderRadius: theme.shape.borderRadius,
}));

export { ProgressContainer };
