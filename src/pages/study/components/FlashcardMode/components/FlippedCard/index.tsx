import { useState } from "react";
import { Word } from "../../../../../../types";
import {
  CardContainer,
  CardFaceBack,
  CardFaceFront,
  CardInnerContainer,
  TypographyProgress,
} from "./FlippedCard.styled";
import AudioPlayer from "../../../../../../components/AudioPlayer";
import { Box, Typography, useTheme } from "@mui/material";
import { MotionValue, motion, useTransform } from "framer-motion";

interface FlippedCardProps {
  word: Word;
  dragged: boolean;
  index: number;
  x: MotionValue<number>;
  xInput: number[];
}

const FlippedCard = ({ word, dragged, index, x, xInput }: FlippedCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();

  const opacityMain = useTransform(x, xInput, [0, 1, 0]);
  const opacityProgressLeft = useTransform(x, xInput, [1, 0, 0]);
  const opacityProgressRight = useTransform(x, xInput, [0, 0, 1]);

  const borderColorOnDrag = useTransform(x, xInput, [
    theme.palette.error.light,
    `${theme.palette.primary.main}20`,
    theme.palette.success.light,
  ]);

  const borderColor =
    index === 0 ? borderColorOnDrag : `${theme.palette.primary.main}20`;

  return (
    <CardContainer>
      <CardInnerContainer
        onClick={() => setFlipped((prev) => !prev && !dragged && index === 0)}
        flipped={flipped}
      >
        <CardFaceFront style={{ borderColor }}>
          {index === 0 && (
            <>
              <Box component={motion.div} style={{ opacity: opacityMain }}>
                <Typography p={3} variant="h4">
                  {word.word}
                </Typography>
                {word.audioURL && <AudioPlayer audioURL={word.audioURL} />}
              </Box>

              <Box
                component={motion.div}
                style={{ opacity: opacityProgressLeft }}
              >
                <TypographyProgress variant="h4" color="error">
                  Learning
                </TypographyProgress>
              </Box>
              <Box
                component={motion.div}
                style={{ opacity: opacityProgressRight }}
              >
                <TypographyProgress variant="h4" color="success">
                  Know
                </TypographyProgress>
              </Box>
            </>
          )}
        </CardFaceFront>

        <CardFaceBack style={{ borderColor }}>
          <Box component={motion.div} style={{ opacity: opacityMain }}>
            {word.translation && (
              <Typography variant="body1" key={index}>
                {word.translation}
              </Typography>
            )}
            {word.definitions.map((def, index) => (
              <Typography variant="body1" key={index}>
                {def.definition}
              </Typography>
            ))}
          </Box>

          <Box component={motion.div} style={{ opacity: opacityProgressLeft }}>
            <TypographyProgress variant="h4" color="error">
              Learning
            </TypographyProgress>
          </Box>
          <Box component={motion.div} style={{ opacity: opacityProgressRight }}>
            <TypographyProgress variant="h4" color="success">
              Know
            </TypographyProgress>
          </Box>
        </CardFaceBack>
      </CardInnerContainer>
    </CardContainer>
  );
};

export default FlippedCard;
