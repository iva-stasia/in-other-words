import { Box, Typography } from "@mui/material";
import FlippedCard from "./components/FlippedCard";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import {
  BtnContainer,
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
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

interface FlashcardModeProps {
  words: Word[];
}

const FlashcardMode = ({ words }: FlashcardModeProps) => {
  const {
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
  } = useFlashcardModeFacade(words);

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
          {wordsToDisplay.map((word, index) => (
            <CommonCardContainer
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handleDragMove}
              key={word.word}
              index={index}
            >
              {index === 0 ? (
                <CurrentCardContainer
                  isDragging={isDragging}
                  movingToLeft={movingToLeft}
                  movingToRight={movingToRight}
                  translateX={translateX}
                >
                  <FlippedCard
                    word={word}
                    dragged={dragged}
                    movingToLeft={movingToLeft}
                    movingToRight={movingToRight}
                    index={index}
                  />
                </CurrentCardContainer>
              ) : (
                <FlippedCard
                  word={word}
                  dragged={dragged}
                  movingToLeft={movingToLeft}
                  movingToRight={movingToRight}
                  index={index}
                />
              )}
            </CommonCardContainer>
          ))}
          <CommonCardContainer index={wordsToDisplay.length}>
            <CardEnd />
          </CommonCardContainer>
        </CardContainer>

        {wordsToDisplay.length > 0 && (
          <>
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
          </>
        )}
      </Container>
    </Box>
  );
};

export default FlashcardMode;
