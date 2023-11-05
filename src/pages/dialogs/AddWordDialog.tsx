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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setAddWordDialog } from "../../store/slices/dialogSlice";
import Search from "../../components/Search";
import { WordDefinition } from "../../types";
import { setSelectedWord } from "../../store/slices/wordSlice";
import { CloseRounded } from "@mui/icons-material";
import AlertMessage from "../../components/AlertMessage";
import DefinitionInput from "../../components/DefinitionInput";
import { createWord } from "../../utils";
import WordSetSelect from "../../components/WordSetSelect";
import useWordApiData from "../../hooks/useWordApiData";
import BtnLoader from "../../components/BtnLoader";

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
  const [translation, setTranslation] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValue(null);
  }, [selectedWord]);

  const handleDialogClose = () => {
    dispatch(setAddWordDialog(false));
    dispatch(setSelectedWord(null));
    setValue(null);
    setWordSet("All words");
    setTranslation("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (value && selectedWord && uid) {
      try {
        await createWord(
          uid,
          selectedWord,
          value,
          wordSet,
          audioURL,
          pronunciation,
          translation
        );
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }

    handleDialogClose();
    setSubmitting(false);
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

            <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
              <FormLabel
                htmlFor="translation"
                sx={{
                  color: "text.primary",
                  "& .Mui-focused": {
                    color: "red",
                  },
                }}
              >
                Translation
              </FormLabel>
              <TextField
                placeholder="Enter a translation"
                id="translation"
                size="small"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
              />
            </FormControl>

            <WordSetSelect
              wordSet={wordSet}
              setWordSet={setWordSet}
              required={false}
            />
          </DialogContent>

          <DialogActions sx={{ p: "0 1.5rem 1rem" }}>
            <Tooltip
              title={(!selectedWord || !value) && "Fill in all required fields"}
              placement="top"
            >
              <Box position="relative">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!selectedWord || !value}
                >
                  <Typography
                    variant="button"
                    sx={{ opacity: submitting ? 0 : 1 }}
                  >
                    Add
                  </Typography>
                  {submitting && <BtnLoader color="text" />}
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
