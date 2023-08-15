import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useOwnWords from "../hooks/useOwnWords";
import WordTable from "../components/WordTable";

const AllWords = () => {
  const { activePage } = useSelector((state: RootState) => state.menu);
  const words = useOwnWords();

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
        {activePage}
      </Typography>
      {words.length ? (
        <WordTable words={words} title="My dictionary" />
      ) : (
        "There are no words in the dictionary yet. Enter a word in the search to add it."
      )}
    </Box>
  );
};

export default AllWords;
