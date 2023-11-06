import { Box, Card, IconButton, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  transition: theme.transitions.create("background-color"),
  "&:hover .MuiBox-root > .MuiBox-root": {
    scale: "1.2",
  },
}));

const JdenticonContainer = styled(Box)(({ theme }) => ({
  opacity: "0.8",
  height: "fit-content",
  transition: theme.transitions.create("scale"),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "8px",
  top: "8px",
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.text.primary,
  },
}));

export { StyledCard, JdenticonContainer, StyledIconButton };
