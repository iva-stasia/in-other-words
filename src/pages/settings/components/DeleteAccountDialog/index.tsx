import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { User, deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import ConfirmDialog from "./components/ConfirmDialog";
import BtnLoader from "../../../../components/BtnLoader";

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
  const [reauth, setReauth] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setDeleteAccountOpen(false);
  };

  const handleDeleteAccount = async () => {
    setSubmitting(true);

    try {
      await deleteUserAndData();
    } catch (error) {
      console.error(error);
      if (
        error instanceof Error &&
        error.message === "Firebase: Error (auth/requires-recent-login)."
      ) {
        setReauth(true);
      }
    }

    handleClose();
    setSubmitting(false);
  };

  const deleteUserAndData = async () => {
    await deleteDoc(doc(db, "users", currentUser.uid));
    await deleteDoc(doc(db, "userWords", currentUser.uid));
    await deleteDoc(doc(db, "userSets", currentUser.uid));
    await deleteDoc(doc(db, "userLearningLog", currentUser.uid));
    await deleteDoc(doc(db, "userNotifications", currentUser.uid));

    await deleteUser(currentUser);
  };

  return (
    <>
      <Dialog
        open={deleteAccountOpen}
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
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} disabled={submitting}>
            <Typography variant="button" sx={{ opacity: submitting ? 0 : 1 }}>
              Delete
            </Typography>
            {submitting && <BtnLoader color="primary" />}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        reauth={reauth}
        setReauth={setReauth}
        currentUser={currentUser}
        mode="deleteAccount"
        deleteUserAndData={deleteUserAndData}
      />
    </>
  );
};

export default DeleteAccountDialog;
