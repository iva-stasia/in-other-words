import { useEffect, useState } from "react";
import { Answer, Progress, Word } from "../../../../types";
import useUpdateProgress from "../../../../hooks/useUpdateProgress";
import { schedule } from "../../../../utils/schedule";

const useFlashcardModeFacade = (words: Word[]) => {
  const [wordsToDisplay, setWordsToDisplay] = useState(words);
  const [curIndex, setCurIndex] = useState(0);
  const [dragged, setDragged] = useState(false);
  const [wordNum, setWordNum] = useState(0);

  const { updateProgress } = useUpdateProgress();

  useEffect(() => {
    setWordsToDisplay(words);
    setWordNum(words.length);
  }, []);

  const handleFail = async () => {
    await handleBtn(Answer.Fail, Progress.New);
    console.log("left");
  };

  const handlePass = async () => {
    await handleBtn(Answer.PassEasy, Progress.Learned);
    console.log("right");
  };

  const handleBtn = async (answer: Answer, progress: Progress) => {
    const word = wordsToDisplay[0];

    // const { dueDate, factor, interval } = schedule(answer, word, progress);

    // try {
    //   await updateProgress(word.word, progress, dueDate, interval, factor);
    // } catch (error) {
    //   if (error instanceof Error) console.error(error.message);
    // }

    setWordsToDisplay((prev) => prev.slice(1));

    if (wordsToDisplay.length - 1 === 0) return;

    setCurIndex((prev) => prev + 1);
  };

  return {
    wordsToDisplay,
    dragged,
    handleFail,
    handlePass,
    curIndex,
    wordNum,
    setDragged,
  };
};

export default useFlashcardModeFacade;
