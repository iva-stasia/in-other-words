import { Typography } from "@mui/material";
import { useState } from "react";
import { CardBack, CardContainer, CardFront } from "./Flashcard.styled";
import { Word } from "@src/types";
import AudioPlayer from "../../../../components/AudioPlayer";

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
