import { useSelector } from "react-redux";
import Flashcards from "../../../flashcards/Flashcards";
import { RootState } from "../../../../store";
import dayjs from "dayjs";

const ReviewComponent = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => dayjs().diff(dayjs(learning.dueDate.toDate()), "day") >= 0
  );

  console.log(wordsToDisplay);

  return <Flashcards words={wordsToDisplay} />;
};

export default ReviewComponent;
