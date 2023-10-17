import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface WordSetSelectProps {
  required: boolean;
  wordSet: string;
  setWordSet: (set: string) => void;
}

const WordSetSelect = ({
  wordSet,
  setWordSet,
  required,
}: WordSetSelectProps) => {
  const wordSets = useSelector((state: RootState) => state.words.wordSets);

  return (
    <FormControl
      fullWidth
      sx={{ my: 1 }}
      variant="outlined"
      size="small"
      required={required}
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
  );
};

export default WordSetSelect;
