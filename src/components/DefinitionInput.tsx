import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { DefinitionInputProps, WordDefinition } from "../types";

const filter = createFilterOptions<WordDefinition>();

const DefinitionInput = ({
  definitions,
  value,
  setValue,
  required,
}: DefinitionInputProps) => {
  return (
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
            <Typography component="span">{option.definition}</Typography>
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
          required={required}
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
  );
};

export default DefinitionInput;
