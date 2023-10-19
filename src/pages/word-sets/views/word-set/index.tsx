import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store";
import WordTable from "../../../../components/WordTable";
import useFilterWords from "../../../../hooks/useFilterWords";

const WordSet = () => {
  const { setTitle } = useParams();
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  const words = useSelector((state: RootState) => state.words.ownWords);

  let filteredWords = useFilterWords(words);

  if (!setTitle) return;

  if (wordSets.length) {
    const isSetExist = !!wordSets.filter((set) => set.title === setTitle)
      .length;

    if (!isSetExist) throw new Error("Set doesn't exist");

    filteredWords = filteredWords.filter(({ set }) => set === setTitle);
  }

  return <WordTable words={filteredWords} title={setTitle} />;
};

export default WordSet;
