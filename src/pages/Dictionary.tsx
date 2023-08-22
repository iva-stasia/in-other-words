import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import WordTable from "../components/WordTable";
import { useParams } from "react-router-dom";

const Dictionary = () => {
  const { setTitle } = useParams();
  const activePage = useSelector((state: RootState) => state.menu.activePage);
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  let words = useSelector((state: RootState) => state.words.ownWords);

  if (setTitle) {
    const isSetExist = !!wordSets.filter((set) => set.title === setTitle)
      .length;
    if (!isSetExist) throw new Error("Set doesn't exist");
    words = words.filter(({ set }) => set === setTitle);
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto", height: "100%" }}>
      <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
        {activePage}
      </Typography>
      <WordTable words={words} title={setTitle || "All words"} />
    </Box>
  );
};

export default Dictionary;
