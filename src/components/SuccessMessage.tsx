import { Alert, Snackbar } from "@mui/material";
import { SuccessMessageProps } from "../types";

const SuccessMessage = ({ alertOpen, setAlertOpen, message }: SuccessMessageProps) => {
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
      <Alert onClose={handleAlertClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;
