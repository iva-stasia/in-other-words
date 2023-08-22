import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import WordTable from "../components/WordTable";
import { useParams } from "react-router-dom";

const Dictionary = () => {
  const { setTitle } = useParams();
  const { activePage } = useSelector((state: RootState) => state.menu);
  let words = useSelector((state: RootState) => state.words.ownWords);

  if (setTitle) {
    words = words.filter(({ set }) => set === setTitle);
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
        {activePage}
      </Typography>
      {words.length ? (
        <WordTable words={words} title={setTitle || "All words"} />
      ) : (
        "There are no words yet. Enter a word in the search to add it."
      )}
    </Box>
  );
};

export default Dictionary;
