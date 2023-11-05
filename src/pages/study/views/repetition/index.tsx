import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import dayjs from "dayjs";
import FlashcardMode from "../../components/FlashcardMode";

const Repetition = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    (word) =>
      dayjs().diff(dayjs(word.learning.dueDate.toDate()), "minute") >= 0 &&
      dayjs(word.createdAt.toDate()).diff(
        dayjs(word.learning.dueDate.toDate()),
        "minute"
      ) !== 0
  );

  return <FlashcardMode words={wordsToDisplay} />;
};

export default Repetition;
