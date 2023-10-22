import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import FlashcardMode from "../../components/FlashcardMode";
import { Progress } from "../../../../types";
import NewFlashcardMode from "../../components/NewFlashcardMode";

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress === Progress.New
  );

  // return <FlashcardMode words={wordsToDisplay} />;
  return <NewFlashcardMode words={wordsToDisplay} />;
};

export default Flashcards;
