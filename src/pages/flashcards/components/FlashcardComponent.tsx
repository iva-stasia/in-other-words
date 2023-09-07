import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";
import { Word } from "../../../types";
import AudioPlayer from "../../../components/AudioPlayer";

interface FlashcardComponentProps {
  word: Word;
}

const FlashcardComponent = ({ word }: FlashcardComponentProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer
      flipped={isFlipped ? 1 : 0}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <CardFront>
        <Typography p={3} variant="h4">
          {word.word}
        </Typography>
        {word.audioURL && <AudioPlayer audioURL={word.audioURL} />}
      </CardFront>
      <CardBack>
        {word.definitions.map((def, index) => (
          <Typography p={3} variant="body1" key={index}>
            {def.definition}
          </Typography>
        ))}
      </CardBack>
    </CardContainer>
  );
};

export default FlashcardComponent;

const CardContainer = styled(Box)<{ flipped: number }>(
  ({ flipped, theme }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 800ms",
    transformStyle: "preserve-3d",
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    ...(flipped && {
      transform: "rotateY(180deg)",
    }),
  })
);

const CardFront = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "2px solid",
  borderColor: `${theme.palette.primary.main}20`,
  wordBreak: "break-all",
  hyphens: "auto",
}));

const CardBack = styled(CardFront)({
  position: "absolute",
  transform: "rotateY(180deg)",
  wordBreak: "normal",
});
