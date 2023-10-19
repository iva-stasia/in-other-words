import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WordTable from "../../components/WordTable";
import useFilterWords from "../../hooks/useFilterWords";

const Dictionary = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);
  const filteredWords = useFilterWords(words);

  return <WordTable words={filteredWords} title="All words" />;
};

export default Dictionary;
