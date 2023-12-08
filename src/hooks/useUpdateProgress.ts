import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Progress } from '../types';
import dayjs from 'dayjs';
import { LearningMode } from '../pages/study/components/FlashcardMode';

const useUpdateProgress = () => {
  const uid = useSelector((state: RootState) => state.user.uid);

  const updateProgress = async (
    word: string,
    progress: Progress,
    dueDate: Date,
    interval: number,
    factor: number,
    mode: LearningMode
  ) => {
    if (!uid) return;

    try {
      await updateDoc(doc(db, 'userWords', uid), {
        [word + '.learning']: {
          dueDate: dueDate,
          interval: interval,
          factor: factor,
          progress: progress,
        },
      });

      if (mode === 'repetition' || progress !== Progress.Learned) return;

      const today = dayjs().format('DDMMYYYY');

      await updateDoc(doc(db, 'userLearningLog', uid), {
        [today]: arrayUnion(word),
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return { updateProgress };
};

export default useUpdateProgress;
