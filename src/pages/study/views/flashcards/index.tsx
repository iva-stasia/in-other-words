import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import FlashcardMode from "../../components/FlashcardMode";
import { Progress } from "../../../../types";

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress === Progress.New
  );

  return <FlashcardMode words={wordsToDisplay} />;
};

export default Flashcards;
