import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store";
import WordTable from "../../../../components/WordTable";

const WordSet = () => {
  const { setTitle } = useParams();
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  let words = useSelector((state: RootState) => state.words.ownWords);

  if (!setTitle) return;

  if (wordSets.length) {
    const isSetExist = !!wordSets.filter((set) => set.title === setTitle)
      .length;

    if (!isSetExist) throw new Error("Set doesn't exist");

    words = words.filter(({ set }) => set === setTitle);
  }

  return <WordTable words={words} title={setTitle} />;
};

export default WordSet;
