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
  setSelectedWord,
} from "../store/slices/addWordDialogSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useOwnWord from "../hooks/useOwnWord";
import useApiWords from "../hooks/useApiWords";
import useWordOptions from "../hooks/useWordOptions";

const filter = createFilterOptions<WordOption>({ matchFrom: "start" });

const Search = ({ withIcon, inDialog }: SearchProps) => {
  const dispatch = useDispatch();
  const { isDialogOpen } = useSelector(
    (state: RootState) => state.addWordDialog
  );
  const word = useSelector(
    (state: RootState) => state.addWordDialog.selectedWord
  );
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<WordOption | null>(word);
  const ownWords = useOwnWord(word);
  const apiWords = useApiWords(inputValue);
  const options = useWordOptions(apiWords, ownWords, inputValue);

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
        const open = !!newValue || isDialogOpen;
        dispatch(setAddWordDialog(open));
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
            ? "Words from dictionary"
            : params.group === "ownDictionary"
            ? "Words from your list"
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
