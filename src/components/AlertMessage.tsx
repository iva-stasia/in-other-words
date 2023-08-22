import { Alert, Snackbar } from "@mui/material";
import { AlertMessageProps } from "../types";

const AlertMessage = ({
  alertOpen,
  setAlertOpen,
  message,
  severity,
}: AlertMessageProps) => {
  const handleAlertClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={3000}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleAlertClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
