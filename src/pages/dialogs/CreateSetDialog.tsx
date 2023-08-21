import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setCreateSetDialog } from "../../store/slices/dialogSlice";
import { CreateSetDialogProps } from "../../types";

const CreateSetDialog = ({ currentSets }: CreateSetDialogProps) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);
  const { isCreateSetDialogOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const [title, setTitle] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);

  const isSetExist = currentSets
    .map((set) => set.title.toLowerCase())
    .includes(title.toLowerCase());

  const handleDialogClose = () => {
    dispatch(setCreateSetDialog(false));
    setTitle("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDialogClose();

    if (title && !isSetExist && uid) {
      try {
        await updateDoc(doc(db, "userSets", uid), {
          sets: arrayUnion({
            title: title.trim(),
            pictureId: crypto.randomUUID(),
          }),
        });
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  return (
    <>
      <Dialog
        open={isCreateSetDialogOpen}
        onClose={handleDialogClose}
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            Create a new set
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <FormLabel htmlFor="set-title" sx={{ color: "text.primary" }}>
                Set title
              </FormLabel>
              <OutlinedInput
                id="set-title"
                type="text"
                placeholder="Enter a word set title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                autoComplete="off"
                autoFocus
              />
              {isSetExist && (
                <FormHelperText error sx={{ mx: 0 }}>
                  Such a set already exists, enter a unique title.
                </FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: "0 1.5rem 1rem" }}>
            <Tooltip
              title={!title && "Enter a unique set title"}
              placement="top"
            >
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!title || isSetExist}
                >
                  Create
                </Button>
              </Box>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={"Set has been successfully created!"}
        severity="success"
      />
    </>
  );
};

export default CreateSetDialog;
