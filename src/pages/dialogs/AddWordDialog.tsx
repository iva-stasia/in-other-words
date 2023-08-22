import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setAddWordDialog } from "../../store/slices/dialogSlice";
import Search from "../../components/Search";
import { WordDefinition } from "../../types";
import useWordApiData from "../../hooks/useWordApiData";
import { setSelectedWord } from "../../store/slices/wordSlice";
import { CloseRounded } from "@mui/icons-material";
import AlertMessage from "../../components/AlertMessage";
import DefinitionInput from "../../components/DefinitionInput";
import { createWord } from "../../utils";
import WordSetSelect from "../../components/WordSetSelect";

const AddWordDialog = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);
  const isAddWordDialogOpen = useSelector(
    (state: RootState) => state.dialog.isAddWordDialogOpen
  );
  const selectedWord = useSelector(
    (state: RootState) => state.words.selectedWord
  );
  const { definitions, pronunciation, audioURL } = useWordApiData(
    isAddWordDialogOpen,
    selectedWord
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [value, setValue] = useState<WordDefinition | null>(null);
  const [wordSet, setWordSet] = useState<string>("All words");

  useEffect(() => {
    setValue(null);
  }, [selectedWord]);

  const handleDialogClose = () => {
    dispatch(setAddWordDialog(false));
    dispatch(setSelectedWord(null));
    setValue(null);
    setWordSet("All words");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDialogClose();

    if (value && selectedWord && uid) {
      try {
        await createWord(
          uid,
          selectedWord,
          value,
          wordSet,
          audioURL,
          pronunciation
        );
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  return (
    <>
      <Dialog open={isAddWordDialogOpen} onClose={handleDialogClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            Add a new word
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
              <FormLabel htmlFor="word" sx={{ color: "text.primary" }}>
                Word
              </FormLabel>
              <Search withIcon={false} inDialog={true} />
            </FormControl>
            <DefinitionInput
              definitions={definitions}
              value={value}
              setValue={setValue}
              required={true}
            />

            <WordSetSelect
              wordSet={wordSet}
              setWordSet={setWordSet}
              required={true}
            />
          </DialogContent>
          <DialogActions sx={{ p: "0 1.5rem 1rem" }}>
            <Tooltip
              title={(!selectedWord || !value) && "Fill in all fields"}
              placement="top"
            >
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!selectedWord || !value}
                >
                  Add
                </Button>
              </Box>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={"Word has been successfully added!"}
        severity="success"
      />
    </>
  );
};

export default AddWordDialog;
