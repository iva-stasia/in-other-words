import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import {
  useRouteError,
  isRouteErrorResponse,
  NavLink as RouterLink,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Box textAlign="center">
        <Typography variant="h1" fontFamily="Kavoon" color="tertiary.main">
          Oops!
        </Typography>
        <Typography component="p" mt={2}>
          {isNotFound
            ? "You are lost"
            : "Sorry, an unexpected error has occurred."}
        </Typography>
      </Box>
      <Link
        component={RouterLink}
        underline="none"
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ArrowBackRounded />
        <Typography variant="button">Go home</Typography>
      </Link>
    </Box>
  );
}
