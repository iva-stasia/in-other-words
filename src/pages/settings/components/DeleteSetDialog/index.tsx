import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import AlertMessage from "../../../../components/AlertMessage";
import { User, deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

interface DeleteAccountDialogProps {
  deleteAccountOpen: boolean;
  currentUser: User;
  setDeleteAccountOpen: (deleteAccountOpen: boolean) => void;
}

const DeleteAccountDialog = ({
  deleteAccountOpen,
  currentUser,
  setDeleteAccountOpen,
}: DeleteAccountDialogProps) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    setOpen(deleteAccountOpen);
  }, [setOpen, deleteAccountOpen]);

  const handleClose = () => {
    setDeleteAccountOpen(false);
  };

  const handleDeleteAccount = async () => {
    handleClose();

    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteDoc(doc(db, "userWords", currentUser.uid));
      await deleteDoc(doc(db, "userSets", currentUser.uid));

      await deleteUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete all content and data linked to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAccount}>Delete</Button>
        </DialogActions>
      </Dialog>

      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message="Account has been successfully deleted!"
        severity="success"
      />
    </>
  );
};

export default DeleteAccountDialog;
