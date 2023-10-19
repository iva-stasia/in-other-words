import {
  CloseRounded,
  FilterListOffRounded,
  FilterListRounded,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import Filter from "./components/Filter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import ToggleFilter from "./components/ToggleFilter";
import { useLocation, useSearchParams } from "react-router-dom";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({ progress: "all" });

  const inSet = pathname.includes("word-sets");

  const wordSetsOptions = wordSets.map((set) => set.title);

  const handleReset = () => {
    setSearchParams((prev) => {
      prev.set("progress", "all");
      prev.delete("set");

      return prev;
    });
  };

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      {open ? (
        <>
          {!inSet && <Filter title="Set" options={wordSetsOptions} />}
          <ToggleFilter />

          <Box>
            <Tooltip title="Reset filters">
              <IconButton onClick={handleReset}>
                <FilterListOffRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Close filters">
              <IconButton onClick={() => setOpen((prev) => !prev)}>
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            <FilterListRounded />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default Filters;
