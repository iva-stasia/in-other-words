import { SearchRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useState } from "react";
import { SearchProps, WordOption } from "../types";
import { useDispatch } from "react-redux";
import {
  setAddWordDialog,
  setWordDataDialog,
} from "../store/slices/dialogSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setSelectedWord } from "../store/slices/wordSlice";
import useApiWords from "../hooks/useApiWords";
import useOwnFilteredWords from "../hooks/useOwnFilteredWords";
import useWordOptions from "../hooks/useWordOptions";

const filter = createFilterOptions<WordOption>({ matchFrom: "start" });

const Search = ({ withIcon, inDialog }: SearchProps) => {
  const dispatch = useDispatch();
  const word = useSelector((state: RootState) => state.words.selectedWord);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<WordOption | null>(word);
  const ownFilteredWords = useOwnFilteredWords(inputValue);
  const apiWords = useApiWords(inputValue);
  const options = useWordOptions(apiWords, ownFilteredWords, inputValue);

  return (
    <Autocomplete
      id="search"
      forcePopupIcon={false}
      clearOnBlur
      autoComplete
      includeInputInList
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.word);
        if (inputValue !== "" && !isExisting) {
          filtered.push({ word: inputValue, source: "custom" });
        }

        return filtered;
      }}
      filterSelectedOptions
      options={value ? [value, ...options] : options}
      getOptionLabel={(option) => option.word}
      noOptionsText="No words"
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      value={value}
      isOptionEqualToValue={(option, value) => option.word === value.word}
      onChange={(_event: any, newValue: null | WordOption) => {
        if (newValue && newValue.source !== "ownDictionary") {
          dispatch(setAddWordDialog(true));
        } else if (newValue && newValue.source === "ownDictionary") {
          dispatch(setWordDataDialog(true));
        }
        dispatch(setSelectedWord(newValue));
        setValue(inDialog ? newValue : null);
      }}
      groupBy={(option) => option.source}
      renderOption={(props, option) => (
        <li {...props}>
          {option.source !== "custom" ? (
            option.word
          ) : (
            <Typography color="primary">Add "{option.word}"</Typography>
          )}
        </li>
      )}
      renderGroup={(params) => {
        const groupName =
          params.group === "apiDictionary"
            ? "New words"
            : params.group === "ownDictionary"
            ? "Words from your dictionary"
            : "Add your own word";
        return (
          <Box key={params.key}>
            <Box
              sx={{
                position: "sticky",
                top: "-8px",
                padding: "4px 10px",
                color: "text.secondary",
                bgcolor: "backgroundSecond.main",
              }}
            >
              {groupName}
            </Box>
            <Box>{params.children}</Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search a word"
          size="small"
          InputProps={{
            ...params.InputProps,
            type: "search",
            ...(withIcon && {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            }),
          }}
        />
      )}
      slotProps={{
        paper: {
          elevation: 6,
        },
      }}
    />
  );
};

export default Search;
