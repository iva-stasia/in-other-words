import { Box, Button, Typography, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: "100%",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
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

  [theme.breakpoints.down("sm")]: {
    minHeight: "100%",
    maxWidth: "100%",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.backgroundSecond.main,
    padding: theme.spacing(0),
  },
}));

const TermContainer = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(6),
  paddingTop: theme.spacing(4),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0),
    flex: 1,
  },
}));

const OptionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1.5),
  },
}));

const DescTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const OptionBtn = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "correct" && prop !== "wrong" && prop !== "correctAnswer",
})<{ correct: boolean; wrong: boolean; correctAnswer: boolean }>(
  ({ theme, correct, wrong, correctAnswer }) => ({
    padding: theme.spacing(1.5),
    paddingInline: theme.spacing(3),
    textAlign: "left",
    textTransform: "none",
    color: "inherit",
    border: "2px solid",
    borderColor: theme.palette.backgroundSecond.main,
    "&:hover": {
      color: theme.palette.primary.main,
      border: "2px solid",
    },

    ...(correct && {
      backgroundColor: `${theme.palette.success.light}20`,
      borderColor: theme.palette.success.light,
      "&:hover": {
        color: "inherit",
        backgroundColor: `${theme.palette.success.light}20`,
        border: "2px solid",
        borderColor: theme.palette.success.light,
      },
    }),

    ...(wrong && {
      backgroundColor: `${theme.palette.error.light}20`,
      borderColor: theme.palette.error.light,
      "&:hover": {
        color: "inherit",
        backgroundColor: `${theme.palette.error.light}20`,
        border: "2px solid",
        borderColor: theme.palette.error.light,
      },
    }),

    ...(correctAnswer && {
      borderColor: theme.palette.success.light,
      "&:hover": {
        color: "inherit",
        backgroundColor: theme.palette.background.default,
        border: "2px solid",
        borderColor: theme.palette.success.light,
      },
    }),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      paddingInline: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.background.default,
    },
  })
);

export {
  Container,
  QuizContainer,
  TermContainer,
  OptionContainer,
  DescTypography,
  OptionBtn,
};
