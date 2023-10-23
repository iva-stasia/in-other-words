import { Box, Button, Typography, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  marginTop: theme.spacing(2),
}));

const QuizContainer = styled(Box)(({ theme }) => ({
  minHeight: "400px",
  width: "800px",
  maxWidth: "80%",
  marginInline: "auto",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
}));

const TermContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(6),
  paddingTop: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const OptionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const DescTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const OptionBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== "correct",
})<{ correct: boolean }>(({ theme, correct }) => ({
  padding: theme.spacing(1.5),
  paddingInline: theme.spacing(3),
  textAlign: "left",
  textTransform: "none",
  color: "inherit",
  borderColor: theme.palette.backgroundSecond.main,
  "&:hover": {
    color: theme.palette.primary.main,
  },

  ...(correct
    ? {
        backgroundColor: `${theme.palette.success.light}50`,
      }
    : {}),
}));

export {
  Container,
  QuizContainer,
  TermContainer,
  OptionContainer,
  DescTypography,
  OptionBtn,
};
