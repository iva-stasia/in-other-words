import { Box, Grid, styled } from "@mui/material";

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
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

export { GridBtnContainer, DeleteAccountContainer };
