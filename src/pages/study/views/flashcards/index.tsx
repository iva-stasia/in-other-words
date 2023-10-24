import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Progress } from "../../../../types";
import FlashcardMode from "../../components/FlashcardMode";

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress === Progress.New
  );

  if (wordsToDisplay.length === 0) return;

  return <FlashcardMode words={wordsToDisplay} />;
};

export default Flashcards;
