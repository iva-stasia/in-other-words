import { Box, Typography } from "@mui/material";
import FlippedCard from "./components/FlippedCard";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import {
  BtnContainer,
  BtnProgressContainer,
  CardContainer,
  CommonCardContainer,
  Container,
  CurrentCardContainer,
  FailBtn,
  PassBtn,
} from "./FlashcardMode.styled";
import { Word } from "../../../../types";
import CardEnd from "./components/CardEnd";
import useFlashcardModeFacade from "./flashcardModeFacade";
import BorderLinearProgress from "../../../../components/BorderLinearProgress";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { fadeIn, flashcard, flashcardCover } from "../../../../utils/motion";
import { useState } from "react";

interface FlashcardModeProps {
  words: Word[];
}

const swipeConfidenceThreshold = 5000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const FlashcardMode = ({ words }: FlashcardModeProps) => {
  const {
    wordsToDisplay,
    dragged,
    handleFail,
    handlePass,
    curIndex,
    wordNum,
    setDragged,
    firstWord,
    matchDownSm,
  } = useFlashcardModeFacade(words);
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];

  const rotate = useTransform(x, [-1000, 0, 1000], [`-30deg`, "0deg", "30deg"]);

  return (
    <Box
      component={motion.div}
      variants={fadeIn("down", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Container>
        <CardContainer>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {firstWord && (
              <CommonCardContainer
                key={firstWord.word}
                index={0}
                style={{ zIndex: 11 }}
              >
                <CurrentCardContainer
                  key={firstWord.word}
                  style={{ x, rotate }}
                  variants={flashcard}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragElastic={1}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setDragged(true)}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      setDirection(1);
                      handleFail().catch(console.error);
                    } else if (swipe > swipeConfidenceThreshold) {
                      setDirection(-1);
                      handlePass().catch(console.error);
                    }
                  }}
                  onClick={() => setDragged(false)}
                >
                  <FlippedCard
                    word={firstWord}
                    dragged={dragged}
                    index={0}
                    x={x}
                    xInput={xInput}
                  />
                </CurrentCardContainer>
              </CommonCardContainer>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {firstWord && (
              <CommonCardContainer
                index={1}
                style={{
                  zIndex: 10,
                  opacity: 1,
                }}
              >
                <CurrentCardContainer
                  key={firstWord.word}
                  variants={flashcardCover}
                  initial={false}
                  animate="center"
                  exit="exit"
                >
                  <FlippedCard
                    word={firstWord}
                    dragged={dragged}
                    index={1}
                    x={x}
                    xInput={xInput}
                  />
                </CurrentCardContainer>
              </CommonCardContainer>
            )}
          </AnimatePresence>

          {wordsToDisplay.map((word, index) => {
            if (index === 0) return;

            return (
              <CommonCardContainer key={word.word} index={index}>
                <CurrentCardContainer key={word.word}>
                  <FlippedCard
                    word={word}
                    dragged={dragged}
                    index={index}
                    x={x}
                    xInput={xInput}
                  />
                </CurrentCardContainer>
              </CommonCardContainer>
            );
          })}

          <CommonCardContainer index={wordsToDisplay.length}>
            <CardEnd />
          </CommonCardContainer>
        </CardContainer>

        <AnimatePresence>
          {wordsToDisplay.length > 0 && (
            <BtnProgressContainer
              variants={fadeIn("up", "tween", 0.2, 0.2)}
              exit={matchDownSm ? { opacity: 0 } : "exit"}
            >
              <BtnContainer>
                <FailBtn size="large" onClick={handleFail}>
                  <CloseRounded fontSize="inherit" />
                </FailBtn>

                <Typography variant="h6">
                  {curIndex + 1}/{wordNum}
                </Typography>

                <PassBtn size="large" onClick={handlePass}>
                  <CheckRounded fontSize="inherit" />
                </PassBtn>
              </BtnContainer>

              <BorderLinearProgress current={curIndex} total={wordNum} />
            </BtnProgressContainer>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default FlashcardMode;
