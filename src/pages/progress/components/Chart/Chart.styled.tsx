import { Box, styled } from "@mui/material";

const ChartContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  maxHeight: "400px",
  flex: 1,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,

  "& .recharts-layer.recharts-line-dots circle": {
    fill: theme.palette.tertiary.main,
  },

  "& .recharts-default-tooltip": {
    borderRadius: "4px",

    ...(theme.palette.mode === "dark" && {
      backgroundColor: `${theme.palette.backgroundSecond.main}!important`,
    }),
  },

  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(0),
  },

  [theme.breakpoints.down("sm")]: {
    maxHeight: "300px",
  },
}));

export { ChartContainer };
