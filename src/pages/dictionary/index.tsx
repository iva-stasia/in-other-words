import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WordTable from "../../components/WordTable";

const Dictionary = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  return <WordTable words={words} title="All words" />;
};

export default Dictionary;
