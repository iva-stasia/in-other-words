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
  MenuItem,
  Select,
  TextField,
  Tooltip,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import {
  setAddWordDialog,
  setSelectedWord,
} from "../store/slices/addWordDialogSlice";
import Search from "../components/Search";
import { WordDefinition } from "../types";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useWordDefinitions from "../hooks/useWordDefinitions";

const filter = createFilterOptions<WordDefinition>();

const AddWordDialog = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);
  const open = useSelector(
    (state: RootState) => state.addWordDialog.isDialogOpen
  );
  const word = useSelector(
    (state: RootState) => state.addWordDialog.selectedWord
  );
  const [value, setValue] = useState<WordDefinition | null>(null);
  const [wordSet, setWordSet] = useState<string>("All words");
  const definitions = useWordDefinitions(open, word);

  useEffect(() => {
    setValue(null);
  }, [word]);

  const handleClose = () => {
    dispatch(setAddWordDialog(false));
    dispatch(setSelectedWord(null));
    setValue(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();

    if (word && value && uid) {
      try {
        await updateDoc(doc(db, "userWords", uid), {
          words: arrayUnion({
            word: word.word,
            definition: value.definition,
            set: wordSet,
            progress: 0,
          }),
        });
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new word</DialogTitle>
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
              <li {...props}>{option.definition}</li>
            )}
            freeSolo
            renderInput={(params) => (
              <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
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

          <FormControl fullWidth sx={{ my: 1 }} variant="outlined" size="small">
            <FormLabel htmlFor="wordSet" sx={{ color: "text.primary" }}>
              Set
            </FormLabel>
            <Select
              id="select"
              value={wordSet}
              onChange={(e) => setWordSet(e.target.value)}
            >
              <MenuItem value="All words">All words</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: "0 1.5rem 1rem" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Tooltip
            title={(!word || !value) && "Fill in all fields"}
            placement="top"
          >
            <Box>
              <Button
                variant="contained"
                type="submit"
                disabled={!word || !value}
              >
                Add
              </Button>
            </Box>
          </Tooltip>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddWordDialog;
