import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Progress } from "../../../../types";
import NewFlashcardMode from "../../components/NewFlashcardMode";

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress === Progress.New
  );

  if (wordsToDisplay.length === 0) return;

  return <NewFlashcardMode words={wordsToDisplay} />;
};

export default Flashcards;
