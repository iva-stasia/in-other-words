import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  options: string[];
  title: string;
}

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const Filter = ({ options, title }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams({ progress: "All" });

  const selected = searchParams.get("set")?.split(",") || [];

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    setSearchParams((prev) => {
      const valueToString =
        typeof value === "string" ? value : value?.join(",");

      if (valueToString) {
        prev.set("set", valueToString);
      } else {
        prev.delete("set");
      }

      return prev;
    });
  };

  return (
    options.length > 0 && (
      <>
        <FormControl sx={{ width: { xs: "100%", sm: 200 } }} size="small">
          <InputLabel id="checkbox-label">{title}</InputLabel>
          <Select
            labelId="checkbox-label"
            id="checkbox"
            multiple
            value={selected}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  checked={selected && selected.indexOf(option) > -1}
                  size="small"
                  sx={{ py: 0 }}
                  disableRipple
                />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    )
  );
};

export default Filter;
