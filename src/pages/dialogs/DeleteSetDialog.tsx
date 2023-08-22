import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteSetDialogProps } from "../../types";
import AlertMessage from "../../components/AlertMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteWord } from "../../utils";

const DeleteSetDialog = ({
  deleteSetOpen,
  set,
  setDeleteSetOpen,
}: DeleteSetDialogProps) => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const ownWords = useSelector((state: RootState) => state.words.ownWords);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteWithWords, setDeleteWithWords] = useState(false);

  useEffect(() => {
    setOpen(deleteSetOpen);
  }, [setOpen, deleteSetOpen]);

  const handleClose = () => {
    setDeleteSetOpen(false);
  };

  const handleDeleteSet = async () => {
    handleClose();

    if (deleteWithWords) {
      deleteSetWords();
    }

    if (uid) {
      try {
        await updateDoc(doc(db, "userSets", uid), {
          sets: arrayRemove(set),
        });
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  const deleteSetWords = () => {
    const setWords = ownWords.filter((word) => word.set === set.title);
    setWords.map(async (word) => await deleteWord(word, uid));
    setDeleteWithWords(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete set?</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={deleteWithWords}
                onClick={() => setDeleteWithWords(!deleteWithWords)}
              />
            }
            label="Delete set words from all my sets and dictionary"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteSet}>Delete</Button>
        </DialogActions>
      </Dialog>
      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message="Set has been successfully deleted!"
        severity="success"
      />
    </>
  );
};

export default DeleteSetDialog;
