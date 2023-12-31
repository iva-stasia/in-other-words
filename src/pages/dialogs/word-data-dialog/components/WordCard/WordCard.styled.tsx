import {
  Box,
  CardContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

const TypographyWord = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  wordBreak: "break-all",
  hyphens: "auto",
  color: theme.palette.tertiary.main,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const TypographyWordShadow = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: -70,
  left: "50%",
  transform: "translateX(-50%)",
  fontFamily: "Kavoon",
  fontSize: "8rem",
  opacity: 0.08,
  whiteSpace: "nowrap",
  color: theme.palette.tertiary.main,
}));

const TypographyTranslation = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "center",
  fontWeight: "400",
  textDecoration: "underline wavy",
  textDecorationColor: theme.palette.tertiary.main,
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "48px",
  top: "8px",
  color: theme.palette.text.disabled,
  "&:hover": {
    color: theme.palette.text.secondary,
  },
}));

const CloseButton = styled(EditButton)({
  right: "8px",
});

const ProgressIconContainer = styled(Box)({
  position: "absolute",
  left: "16px",
  top: "16px",
  height: "24px",
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(4),
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const WordInfoContainer = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export {
  TypographyWord,
  TypographyWordShadow,
  EditButton,
  CloseButton,
  ProgressIconContainer,
  StyledCardContent,
  WordInfoContainer,
  TypographyTranslation,
};
