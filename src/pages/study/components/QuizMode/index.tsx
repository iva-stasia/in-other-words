import { useRef, useState } from "react";
import { WordDefinition } from "../../../../types";
import { Button, Typography } from "@mui/material";
import AudioPlayer from "../../../../components/AudioPlayer";
import {
  Container,
  DescTypography,
  OptionBtn,
  OptionContainer,
  QuizContainer,
  TermContainer,
} from "./QuizMode.styled";
import BorderLinearProgress from "../../../../components/BorderLinearProgress";

interface QuizModeProps {
  questions: {
    word: string;
    audio: string | undefined;
    answer: WordDefinition[];
    options: WordDefinition[][];
  }[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const QuizMode = ({ questions }: QuizModeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [chosen, setChosen] = useState<WordDefinition[] | null>(null);
  const [chosenIndex, setChosenIndex] = useState<number>(0);
  const scoreRef = useRef(0);
  const correctRef = useRef(false);

  const shuffledOptions = shuffleArray(questions[currentQuestion].options);

  console.log("rendering");
  console.log(correctRef.current);

  const handleClick = (option: WordDefinition[], index: number) => {
    if (chosen) return;

    setChosen(option);
    setChosenIndex(index);

    if (option === questions[currentQuestion].answer) {
      scoreRef.current += 1;
      correctRef.current = true;
    } else {
      correctRef.current = false;
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 5000);
      setChosen(null);
    }
  };

  return (
    <Container>
      <QuizContainer>
        <BorderLinearProgress
          current={currentQuestion}
          total={questions.length}
        />

        <TermContainer>
          <Typography variant="h6">
            {questions[currentQuestion].word}
          </Typography>
          {questions[currentQuestion].audio && (
            <AudioPlayer audioURL={questions[currentQuestion].audio || ""} />
          )}
        </TermContainer>

        <OptionContainer>
          <DescTypography variant="subtitle1">
            Choose correct option
          </DescTypography>
          {shuffledOptions.map((option, index) => (
            <OptionBtn
              key={index}
              variant="outlined"
              size="large"
              disableRipple
              onClick={() => handleClick(option, index)}
              correct={
                index === chosenIndex ? correctRef.current && !!chosen : false
              }
            >
              {option.map((def, index) => (
                <Typography key={index} width={1}>
                  {def.definition}
                </Typography>
              ))}
            </OptionBtn>
          ))}
        </OptionContainer>
      </QuizContainer>
    </Container>
  );
};

export default QuizMode;
