import { useEffect, useState } from "react";
import { Word, WordDefinition, WordOption } from "../../types";
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
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../../store/slices/dialogSlice";
import DefinitionInput from "../../components/DefinitionInput";
import { DeleteRounded } from "@mui/icons-material";
import { updateWord } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AlertMessage from "../../components/AlertMessage";
import WordSetSelect from "../../components/WordSetSelect";
import useWordApiData from "../../hooks/useWordApiData";

interface UpdateWordDialogProps {
  open: boolean;
  wordData: Word;
  setOpen: (open: boolean) => void;
}

const isEqual = (
  def: WordDefinition,
  selectedDefs: WordDefinition[] | null
) => {
  if (selectedDefs) {
    return selectedDefs?.some(
      (selected) => selected.definition === def.definition
    );
  }
};

const UpdateWordDialog = ({
  open,
  wordData,
  setOpen,
}: UpdateWordDialogProps) => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);
  const [value, setValue] = useState<WordDefinition | null>(null);
  const [selectedDefs, setSelectedDefs] = useState<WordDefinition[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordOption | null>(null);
  const [wordSet, setWordSet] = useState<string>(wordData.set);
  const [alertOpen, setAlertOpen] = useState(false);
  const [translation, setTranslation] = useState<string | undefined>(
    wordData.translation
  );
  const { definitions } = useWordApiData(open, selectedWord);

  const filteredDefs = definitions.filter((def) => !isEqual(def, selectedDefs));

  useEffect(() => {
    const newSelectedWord: WordOption = {
      word: wordData.word,
      source: "ownDictionary",
    };
    setSelectedWord(newSelectedWord);
    setSelectedDefs(wordData.definitions);
  }, [wordData]);

  useEffect(() => {
    if (value) {
      setSelectedDefs((prevDefs) => [...prevDefs, value]);
      setValue(null);
    }
  }, [value]);

  const handleClose = () => {
    dispatch(setWordDataDialog(true));
    setOpen(false);
  };

  const handleDeleteClick = (index: number) => {
    const newDefs = selectedDefs.filter((_def, id) => id !== index);
    setSelectedDefs(newDefs);
  };

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    handleClose();

    if (selectedDefs && selectedWord && uid) {
      try {
        await updateWord(uid, selectedWord, wordSet, selectedDefs, translation);
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit word "{wordData.word}"</DialogTitle>

        <DialogContent>
          <DefinitionInput
            definitions={filteredDefs}
            value={value}
            setValue={setValue}
            required={false}
          />
          <Box>
            {selectedDefs &&
              selectedDefs.map((def, index) => (
                <Box
                  key={def.definition}
                  sx={{
                    my: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography component="span">{def.definition}</Typography>
                    {def.partOfSpeech && (
                      <Typography component="span" sx={{ fontStyle: "italic" }}>
                        , {def.partOfSpeech}
                      </Typography>
                    )}
                  </Box>
                  {selectedDefs.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <DeleteRounded fontSize="inherit" />
                    </IconButton>
                  )}
                </Box>
              ))}
          </Box>

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

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleSave(e)}>Save</Button>
        </DialogActions>
      </Dialog>

      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={"Word has been successfully edited!"}
        severity="success"
      />
    </>
  );
};

export default UpdateWordDialog;
