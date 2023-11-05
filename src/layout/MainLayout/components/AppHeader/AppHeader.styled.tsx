import { AppBar, styled } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    borderBottom: "3px solid",
    borderColor: theme.palette.backgroundSecond.main,
  },
}));

export { StyledAppBar };
