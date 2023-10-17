import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Theme, useMediaQuery } from "@mui/material";
import { Answer, Progress, Word } from "../../../../types";
import { schedule } from "../../../../utils/schedule";
import useUpdateProgress from "../../../../hooks/useUpdateProgress";

const useFlashcardModeFacade = (wordsToDisplay: Word[]) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [curIndex, setCurIndex] = useState(0);
  const [cardEnd, setCardEnd] = useState(false);
  const matchDownMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { updateProgress } = useUpdateProgress();

  const handleFail = async () => {
    await handleBtn(Answer.Fail, Progress.New);
  };

  const handlePass = async () => {
    await handleBtn(Answer.PassEasy, Progress.Learnt);
  };

  const handleBtn = async (answer: Answer, progress: Progress) => {
    if (!swiperRef.current) return;

    const word = wordsToDisplay[curIndex];

    const { dueDate, factor, interval } = schedule(answer, word);

    try {
      await updateProgress(word.word, progress, dueDate, interval, factor);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

    swiperRef.current.slideNext();

    if (!(curIndex === wordsToDisplay.length - 1)) return;
    setCardEnd(true);
  };

  return {
    setCurIndex,
    cardEnd,
    matchDownMd,
    handleFail,
    handlePass,
    swiperRef,
  };
};

export default useFlashcardModeFacade;
