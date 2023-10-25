import { Box, Grid, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  overflow: "auto",
  marginTop: theme.spacing(2),
  height: "100%",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  minHeight: "400px",
  maxWidth: "800px",
  width: "80%",
  marginInline: "auto",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    minHeight: "100%",
    maxWidth: "100%",
    gap: theme.spacing(2),
    backgroundColor: theme.palette.backgroundSecond.main,
    padding: theme.spacing(0),
  },
}));

const GridBtnContainer = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
}));

const DeleteAccountContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  border: "2px dashed",
  borderColor: theme.palette.error.light,
  backgroundColor: `${theme.palette.error.light}10`,
  borderRadius: "8px",

  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

export { Container, InnerContainer, GridBtnContainer, DeleteAccountContainer };
