import { SearchRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SearchProps, SearchResult, WordOption, Word } from "../types";
import { useDispatch } from "react-redux";
import {
  setAddWordDialog,
  setSelectedWord,
} from "../store/slices/addWordDialogSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { wordsApi } from "../api";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const filter = createFilterOptions<WordOption>({ matchFrom: "start" });

const Search = ({ withIcon, inDialog }: SearchProps) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.user);
  const { isDialogOpen } = useSelector(
    (state: RootState) => state.addWordDialog
  );
  const word = useSelector(
    (state: RootState) => state.addWordDialog.selectedWord
  );
  const [ownWords, setOwnWords] = useState<string[]>([]);
  const [apiWords, setApiWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<WordOption | null>(word);
  const [options, setOptions] = useState<WordOption[]>([]);

  useEffect(() => {
    if (inputValue.length < 2) return undefined;

    const searchWord = async () => {
      const words = await wordsApi(
        `?letterPattern=%5E${inputValue}%5B%5Cw.-%5D*%24&limit=5&page=1`
      ).json<SearchResult>();

      setApiWords(words.results.data);
    };

    searchWord().catch(console.error);
  }, [inputValue]);

  useEffect(() => {
    const getOwnWords = async () => {
      if (uid) {
        const docSnap = await getDoc(doc(db, "userWords", uid));
        const wordsData = docSnap.data();

        if (wordsData) {
          const words =
            wordsData.words !== undefined ? (wordsData.words as Word[]) : [];
          const preparedWords = words.map(({ word }) => word);

          if (word) {
            const filteredOwnWords = preparedWords.filter((ownWord) =>
              ownWord.includes(word.word, 0)
            );
            setOwnWords(filteredOwnWords);
            return undefined;
          }

          setOwnWords(preparedWords);
        }
      }
    };

    getOwnWords().catch(console.error);
  }, [uid, word]);

  useEffect(() => {
    const notAddedApiWords = apiWords.filter(
      (word) => !ownWords.includes(word)
    );
    const preparedNotAddedApiWords = notAddedApiWords.map<WordOption>(
      (word) => ({ word, source: "apiDictionary" })
    );
    const preparedOwnWords = ownWords.map<WordOption>((word) => ({
      word,
      source: "ownDictionary",
    }));

    if (inputValue.length < 2) {
      setOptions([]);
      return undefined;
    }

    setOptions([...preparedNotAddedApiWords, ...preparedOwnWords]);
  }, [ownWords, apiWords, inputValue]);

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
