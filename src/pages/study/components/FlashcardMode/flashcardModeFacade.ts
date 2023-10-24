import { useEffect, useState } from "react";
import { Answer, Progress, Word } from "../../../../types";
import useUpdateProgress from "../../../../hooks/useUpdateProgress";
import { schedule } from "../../../../utils/schedule";

const useFlashcardModeFacade = (words: Word[]) => {
  const [wordsToDisplay, setWordsToDisplay] = useState(words);
  const [curIndex, setCurIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [movingToLeft, setMovingToLeft] = useState(false);
  const [movingToRight, setMovingToRight] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [wordNum, setWordNum] = useState(0);

  const { updateProgress } = useUpdateProgress();

  useEffect(() => {
    setWordsToDisplay(words);
    setWordNum(words.length);

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();

    setDragged(false);
    setIsDragging(true);
    setInitialX(e.clientX);
  };

  const handlePointerUp = async () => {
    event?.stopPropagation();

    if (dragged) {
      if (translateX < -200) {
        await handleFail();
      } else if (translateX > 200) {
        await handlePass();
      }
    }

    setIsDragging(false);
    setTranslateX(0);
    setMovingToLeft(false);
    setMovingToRight(false);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    e.stopPropagation();

    if (!isDragging) return;

    if (initialX - e.clientX > 1) {
      setDragged(true);
    } else if (initialX - e.clientX < -1) {
      setDragged(true);
    }

    if (initialX - e.clientX > 50) {
      setMovingToLeft(true);
    } else {
      setMovingToLeft(false);
    }

    if (initialX - e.clientX < -50) {
      setMovingToRight(true);
    } else {
      setMovingToRight(false);
    }

    setTranslateX(translateX + e.movementX);
  };

  const handleFail = async () => {
    await handleBtn(Answer.Fail, Progress.New);
  };

  const handlePass = async () => {
    await handleBtn(Answer.PassEasy, Progress.Learned);
  };

  const handleBtn = async (answer: Answer, progress: Progress) => {
    const word = wordsToDisplay[0];

    const { dueDate, factor, interval } = schedule(answer, word, progress);

    try {
      await updateProgress(word.word, progress, dueDate, interval, factor);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

    setWordsToDisplay((prev) => prev.slice(1));

    if (wordsToDisplay.length - 1 === 0) return;

    setCurIndex((prev) => prev + 1);
  };

  return {
    wordsToDisplay,
    handlePointerDown,
    handlePointerUp,
    handleDragMove,
    isDragging,
    movingToLeft,
    movingToRight,
    translateX,
    dragged,
    handleFail,
    handlePass,
    curIndex,
    wordNum,
  };
};

export default useFlashcardModeFacade;
