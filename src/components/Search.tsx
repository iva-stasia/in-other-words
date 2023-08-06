import { SearchRounded } from "@mui/icons-material";
import {
  Autocomplete,
  InputAdornment,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddedOption, SearchProps, SearchResult } from "../types";
import { useDispatch } from "react-redux";
import { setDialog, setWord } from "../store/slices/addWordDialogSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { wordsApi } from '../api';

const filter = createFilterOptions<string | AddedOption>();

const Search = ({ withIcon, inDialog }: SearchProps) => {
  const dispatch = useDispatch();
  const { isDialogOpen } = useSelector(
    (state: RootState) => state.addWordDialog
  );
  const { word } = useSelector(
    (state: RootState) => state.addWordDialog.selectedWord
  );
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<string | AddedOption | null>(word);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const searchWord = async () => {
      const words = await wordsApi(
        `?letterPattern=%5E${inputValue}%5B%5Cw.-%5D*%24&limit=10&page=1`
      ).json<SearchResult>();

      setOptions(words.results.data);
      console.log(words.results.data);
    };

    if (inputValue.length < 2) {
      setOptions([]);
      return undefined;
    }

    searchWord().catch(console.error);
  }, [inputValue]);

  useEffect(() => {
    if (!value || !word) {
      setOptions([]);
    }
  }, [value, word]);

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
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push({ value: inputValue, added: true });
        }

        return filtered;
      }}
      filterSelectedOptions
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.value
      }
      noOptionsText="No words"
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      value={value}
      onChange={(_event: any, newValue: string | null | AddedOption) => {
        const word =
          typeof newValue === "string" || newValue === null
            ? { word: newValue, isCustom: false }
            : { word: newValue.value.trim(), isCustom: true };
        const open = !!newValue || isDialogOpen;
        dispatch(setDialog(open));
        dispatch(setWord(word));
        setValue(inDialog ? newValue : null);
      }}
      renderOption={(props, option) => (
        <li {...props}>
          {typeof option === "string" ? (
            option
          ) : (
            <Typography color="primary">Add "{option.value}"</Typography>
          )}
        </li>
      )}
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
