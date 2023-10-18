import { Container, IconButton, styled } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  "&:focus-visible": {
    outline: "none",
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(2),
  ...(theme.palette.mode === "light"
    ? {
        color: theme.palette.background.default,
      }
    : {
        color: theme.palette.text.primary,
      }),
}));

export { StyledContainer, NavButton };
