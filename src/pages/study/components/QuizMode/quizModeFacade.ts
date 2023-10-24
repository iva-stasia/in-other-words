import { useEffect, useRef, useState } from "react";
import { Answer, Progress, QuizQuestion } from "../../../../types";
import { schedule } from "../../../../utils/schedule";
import useUpdateProgress from "../../../../hooks/useUpdateProgress";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const useQuizModeFacade = (questions: QuizQuestion[]) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [chosenIndex, setChosenIndex] = useState<number>(0);
  const [end, setEnd] = useState(false);
  const scoreRef = useRef(0);
  const isCorrectRef = useRef(false);
  const { updateProgress } = useUpdateProgress();

  useEffect(() => {
    const newShuffledOptions = shuffleArray(questions[currentQuestion].options);

    setShuffledOptions(newShuffledOptions);
  }, [currentQuestion, questions]);

  const handleClick = async (option: string, index: number) => {
    if (chosen) return;

    setChosen(option);
    setChosenIndex(index);

    const currentProgress = questions[currentQuestion].origin.learning.progress;

    let delay = 0;

    if (option === questions[currentQuestion].answer) {
      scoreRef.current += 1;
      isCorrectRef.current = true;
      delay = 1000;

      await handleAnswer(Answer.PassEasy, currentProgress + 1);
    } else {
      isCorrectRef.current = false;
      delay = 2500;

      await handleAnswer(Answer.Fail, currentProgress);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setChosen(null);
        setChosenIndex(0);
      }, delay);
    } else {
      setTimeout(() => {
        setEnd(true);
      }, delay);
    }
  };

  const handleAnswer = async (answer: Answer, progress: Progress) => {
    const word = questions[currentQuestion].origin;

    const { dueDate, factor, interval } = schedule(answer, word);

    try {
      await updateProgress(word.word, progress, dueDate, interval, factor);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const correctAnswerIndex = shuffledOptions.indexOf(
    questions[currentQuestion].answer
  );

  return {
    end,
    currentQuestion,
    shuffledOptions,
    handleClick,
    chosenIndex,
    isCorrectRef,
    chosen,
    correctAnswerIndex,
    scoreRef,
  };
};

export default useQuizModeFacade;
