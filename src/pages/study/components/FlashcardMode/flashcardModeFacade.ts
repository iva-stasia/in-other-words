import { useEffect, useState } from 'react';
import { Answer, Progress, Word } from '../../../../types';
import useUpdateProgress from '../../../../hooks/useUpdateProgress';
import { schedule } from '../../../../utils/schedule';
import { useMediaQuery, useTheme } from '@mui/material';
import { LearningMode } from '.';

const useFlashcardModeFacade = (words: Word[], mode: LearningMode) => {
  const [wordsToDisplay, setWordsToDisplay] = useState(words);
  const [curIndex, setCurIndex] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [wordNum, setWordNum] = useState(0);
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [direction, setDirection] = useState(0);

  const { updateProgress } = useUpdateProgress();

  useEffect(() => {
    setWordsToDisplay(words);
    setWordNum(words.length);
  }, []);

  const handleFail = async () => {
    setDirection(1);
    await handleBtn(Answer.Fail, Progress.New);
  };

  const handlePass = async () => {
    setDirection(-1);
    await handleBtn(Answer.PassEasy, Progress.Learned);
  };

  const handleBtn = async (answer: Answer, progress: Progress) => {
    const word = wordsToDisplay[0];

    const { dueDate, factor, interval } = schedule(answer, word, progress);

    setWordsToDisplay((prev) => prev.slice(1));

    try {
      await updateProgress(
        word.word,
        progress,
        dueDate,
        interval,
        factor,
        mode
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

    if (wordsToDisplay.length - 1 === 0) return;

    setCurIndex((prev) => prev + 1);
  };

  const firstWord = wordsToDisplay.length > 0 && wordsToDisplay[0];

  return {
    wordsToDisplay,
    dragged,
    handleFail,
    handlePass,
    curIndex,
    wordNum,
    setDragged,
    setWordsToDisplay,
    firstWord,
    matchDownSm,
    direction,
  };
};

export default useFlashcardModeFacade;
