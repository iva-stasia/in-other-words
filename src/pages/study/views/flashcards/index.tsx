import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Progress } from '../../../../types';
import FlashcardMode from '../../components/FlashcardMode';

const Flashcards = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress !== Progress.Learned
  );

  return <FlashcardMode words={wordsToDisplay} mode="learning" />;
};

export default Flashcards;
