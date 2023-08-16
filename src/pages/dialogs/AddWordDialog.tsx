import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setAddWordDialog } from "../../store/slices/dialogSlice";
import Search from "../../components/Search";
import { WordDefinition } from "../../types";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useWordApiData from "../../hooks/useWordApiData";
import { setSelectedWord } from "../../store/slices/wordSlice";
import { CloseRounded } from "@mui/icons-material";
import SuccessMessage from "../../components/SuccessMessage";

const filter = createFilterOptions<WordDefinition>();

const AddWordDialog = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);
  const { isAddWordDialogOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { selectedWord } = useSelector((state: RootState) => state.words);
  const { wordSets } = useSelector((state: RootState) => state.words);
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

    if (selectedWord && value && uid) {
      try {
        await updateDoc(doc(db, "userWords", uid), {
          words: arrayUnion({
            word: selectedWord.word,
            definition: value.definition,
            partOfSpeech: value.partOfSpeech || "",
            examples: value.examples || "",
            synonyms: value.synonyms || "",
            pronunciation: pronunciation || "",
            audioURL,
            set: wordSet,
            progress: 0,
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
            <Autocomplete
              value={value}
              onChange={(_event, newValue) => {
                if (typeof newValue === "string") {
                  setValue({
                    definition: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setValue({
                    definition: newValue.inputValue.trim(),
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option.definition
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    definition: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              clearOnBlur
              autoComplete
              id="definition"
              options={definitions}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.definition;
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography component="span">
                      {option.definition}
                    </Typography>
                    {option.partOfSpeech && (
                      <Typography component="span" sx={{ fontStyle: "italic" }}>
                        , {option.partOfSpeech}
                      </Typography>
                    )}
                  </Box>
                </li>
              )}
              freeSolo
              renderInput={(params) => (
                <FormControl
                  fullWidth
                  sx={{ my: 1 }}
                  variant="outlined"
                  required
                >
                  <FormLabel
                    htmlFor="definition"
                    sx={{
                      color: "text.primary",
                      "& .Mui-focused": {
                        color: "red",
                      },
                    }}
                  >
                    Definition
                  </FormLabel>
                  <TextField
                    {...params}
                    placeholder="Select or enter a definition"
                    id="definition"
                    size="small"
                  />
                </FormControl>
              )}
              slotProps={{
                paper: {
                  elevation: 6,
                },
              }}
              sx={{
                "&.Mui-focused label": {
                  color: "primary.main",
                },
              }}
            />

            <FormControl
              fullWidth
              sx={{ my: 1 }}
              variant="outlined"
              size="small"
            >
              <FormLabel htmlFor="wordSet" sx={{ color: "text.primary" }}>
                Set
              </FormLabel>
              <Select
                id="select"
                value={wordSet}
                onChange={(e) => setWordSet(e.target.value)}
              >
                <MenuItem value="All words">All words</MenuItem>
                {wordSets
                  .map((set) => set.title)
                  .map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
      <SuccessMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={"Word has been successfully added!"}
      />
    </>
  );
};

export default AddWordDialog;
