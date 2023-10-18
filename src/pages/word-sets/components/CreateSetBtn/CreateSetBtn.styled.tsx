import { AddRounded } from "@mui/icons-material";
import { ButtonBase, Card, styled } from "@mui/material";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  height: "100%",
  width: "100%",
  borderRadius: `${theme.shape.borderRadius}px`,
  "&:hover, &.Mui-focusVisible": {
    "& .MuiCard-root": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  border: "2px dashed",
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.backgroundSecond.main,
  transition: theme.transitions.create("background-color"),
}));

const StyledAddRounded = styled(AddRounded)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: theme.palette.primary.main,
}));

export { StyledButtonBase, StyledCard, StyledAddRounded };
