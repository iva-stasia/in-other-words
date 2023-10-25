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
  const [_searchParams, setSearchParams] = useSearchParams();

  const inSet = pathname.includes("word-sets");

  const wordSetsOptions = wordSets.map((set) => set.title);

  const handleReset = () => {
    setSearchParams((prev) => {
      prev.delete("progress");
      prev.delete("set");

      return prev;
    });
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-end", sm: "center" }}
      gap={{ xs: 1, sm: 2 }}
      sx={{
        ...(open && { width: { xs: "calc(100vw - 38px)", sm: "auto" } }),
      }}
    >
      {open ? (
        <>
          <Box
            sx={{
              width: "100%",
              order: { xs: 1, sm: 0 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 2 },
            }}
          >
            <ToggleFilter />
            {!inSet && <Filter title="Set" options={wordSetsOptions} />}
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
