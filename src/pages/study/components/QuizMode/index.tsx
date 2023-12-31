import { QuizQuestion } from "../../../../types";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import AudioPlayer from "../../../../components/AudioPlayer";
import {
  Container,
  DescTypography,
  EndCardContainer,
  OptionBtn,
  OptionContainer,
  ProgressContainer,
  QuizContainer,
  TermContainer,
} from "./QuizMode.styled";
import BorderLinearProgress from "../../../../components/BorderLinearProgress";
import EndCard from "./components/EndCard";
import useQuizModeFacade from "./quizModeFacade";
import { AnimatePresence, motion } from "framer-motion";
import { fade, fadeIn, slideIn } from "../../../../utils/motion";

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
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      component={motion.div}
      variants={matchDownSm ? fade : fadeIn("down", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <ProgressContainer>
        <BorderLinearProgress
          current={currentQuestion}
          total={questions.length}
        />
      </ProgressContainer>

      <AnimatePresence mode="wait" initial={false}>
        {!end && (
          <Box
            height={1}
            display={{ xs: "flex", sm: "block" }}
            component={motion.div}
            variants={slideIn("right", "tween", 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
            key={currentQuestion}
          >
            <QuizContainer>
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
            </QuizContainer>
          </Box>
        )}

        {end && (
          <EndCardContainer
            component={motion.div}
            variants={slideIn("right", "tween", 0, 0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <EndCard current={scoreRef.current} total={questions.length} />
          </EndCardContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default QuizMode;
