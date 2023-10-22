import { useState } from "react";
import { Word } from "../../../../../../types";
import {
  CardContainer,
  CardFaceBack,
  CardFaceFront,
  CardInnerContainer,
  TypographyProgress,
  TypographyMain,
} from "./FlippedCard.styled";
import AudioPlayer from "../../../../../../components/AudioPlayer";
import { Box } from "@mui/material";

interface FlippedCardProps {
  word: Word;
  dragged: boolean;
  movingToLeft: boolean;
  movingToRight: boolean;
  index: number;
}

const FlippedCard = ({
  word,
  dragged,
  movingToLeft,
  movingToRight,
  index,
}: FlippedCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <CardContainer>
      <CardInnerContainer
        onClick={() => setFlipped((prev) => !prev && !dragged && index === 0)}
        flipped={flipped}
      >
        <CardFaceFront
          movingToLeft={movingToLeft}
          movingToRight={movingToRight}
          index={index}
        >
          {index === 0 && (
            <>
              <Box>
                <TypographyMain
                  variant="h4"
                  movingToLeft={movingToLeft}
                  movingToRight={movingToRight}
                >
                  {word.word}
                </TypographyMain>
                {word.audioURL && <AudioPlayer audioURL={word.audioURL} />}
              </Box>
              <TypographyProgress
                variant="h4"
                direction={movingToLeft}
                color="error"
              >
                Learning
              </TypographyProgress>
              <TypographyProgress
                variant="h4"
                direction={movingToRight}
                color="success"
              >
                Know
              </TypographyProgress>
            </>
          )}
        </CardFaceFront>

        <CardFaceBack
          movingToLeft={movingToLeft}
          movingToRight={movingToRight}
          index={index}
        >
          {word.definitions.map((def, index) => (
            <TypographyMain
              variant="body1"
              key={index}
              movingToLeft={movingToLeft}
              movingToRight={movingToRight}
            >
              {def.definition}
            </TypographyMain>
          ))}
          <TypographyProgress
            variant="h4"
            direction={movingToLeft}
            color="error"
          >
            Learning
          </TypographyProgress>
          <TypographyProgress
            variant="h4"
            direction={movingToRight}
            color="success"
          >
            Know
          </TypographyProgress>
        </CardFaceBack>
      </CardInnerContainer>
    </CardContainer>
  );
};

export default FlippedCard;
