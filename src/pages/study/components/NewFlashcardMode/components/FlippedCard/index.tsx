import { useState } from "react";
import { Word } from "../../../../../../types";
import {
  CardContainer,
  CardFaceBack,
  CardFaceFront,
  CardInnerContainer,
} from "./FlippedCard.styled";
import { Typography } from "@mui/material";

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
        onClick={() => setFlipped((prev) => !prev && !dragged)}
        flipped={flipped}
      >
        <CardFaceFront
          movingToLeft={movingToLeft}
          movingToRight={movingToRight}
          index={index}
        >
          {index === 0 && (
            <>
              <Typography
                p={3}
                variant="h4"
                sx={{
                  opacity: `${movingToLeft || movingToRight ? 0 : 1}`,
                  transition: "opacity 200ms ease-in",
                }}
              >
                {word.word}
              </Typography>
              <Typography
                p={3}
                variant="h4"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: `${movingToLeft ? 1 : 0}`,
                  transition: "opacity 200ms ease-in",
                  color: "error.light",
                }}
              >
                Learning
              </Typography>
              <Typography
                p={3}
                variant="h4"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: `${movingToRight ? 1 : 0}`,
                  transition: "opacity 200ms ease-in",
                  color: "success.light",
                }}
              >
                Know
              </Typography>
            </>
          )}
        </CardFaceFront>

        <CardFaceBack>
          {word.definitions.map((def, index) => (
            <Typography p={3} variant="body1" key={index}>
              {def.definition}
            </Typography>
          ))}
        </CardFaceBack>
      </CardInnerContainer>
    </CardContainer>
  );
};

export default FlippedCard;
