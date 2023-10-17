import { Alert, AlertColor, Snackbar } from "@mui/material";

interface AlertMessageProps {
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  message: string;
  severity: AlertColor;
}

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
