import { CloseRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import Filter from "./components/Filter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import ToggleFilter from "./components/ToggleFilter";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const wordSets = useSelector((state: RootState) => state.words.wordSets);

  const wordSetsOptions = wordSets.map((set) => set.title);

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      {open ? (
        <>
          <Filter title="Set" options={wordSetsOptions} />
          <ToggleFilter />

          <Tooltip title="Close filters">
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <CloseRounded />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <CloseRounded /> : <FilterListRounded />}
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default Filters;
