import { QuizQuestion } from "../../../../types";
import { Stack, Typography } from "@mui/material";
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
import EndCard from "./components/EndCard";
import useQuizModeFacade from "./quizModeFacade";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

interface QuizModeProps {
  questions: QuizQuestion[];
}

const QuizMode = ({ questions }: QuizModeProps) => {
  const {
    end,
    currentQuestion,
    shuffledOptions,
    handleClick,
    chosenIndex,
    isCorrectRef,
    chosen,
    correctAnswerIndex,
    scoreRef,
  } = useQuizModeFacade(questions);

  return (
    <Container
      component={motion.div}
      variants={fadeIn("down", "tween", 0, 0.5)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <QuizContainer>
        {!end && (
          <>
            <BorderLinearProgress
              current={currentQuestion}
              total={questions.length}
            />

            <TermContainer>
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">
                  {questions[currentQuestion].term}
                </Typography>
                {questions[currentQuestion].audio && (
                  <AudioPlayer
                    audioURL={questions[currentQuestion].audio || ""}
                  />
                )}
              </Stack>
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
                    index === chosenIndex && isCorrectRef.current && !!chosen
                  }
                  wrong={
                    index === chosenIndex && !isCorrectRef.current && !!chosen
                  }
                  correctAnswer={
                    index === correctAnswerIndex &&
                    !!chosen &&
                    !isCorrectRef.current
                  }
                  chosen={!!chosen}
                >
                  <Typography key={index} width={1}>
                    {option}
                  </Typography>
                </OptionBtn>
              ))}
            </OptionContainer>
          </>
        )}

        {end && <EndCard current={scoreRef.current} total={questions.length} />}
      </QuizContainer>
    </Container>
  );
};

export default QuizMode;
