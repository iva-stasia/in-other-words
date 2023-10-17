import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import dayjs from "dayjs";
import FlashcardMode from "../../components/FlashcardMode";

const Review = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => dayjs().diff(dayjs(learning.dueDate.toDate()), "day") >= 0
  );

  return <FlashcardMode words={wordsToDisplay} />;
};

export default Review;
