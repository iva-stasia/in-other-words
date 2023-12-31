import { Word } from "../../../../../types";
import { Box, Card, Divider, Tooltip, Typography } from "@mui/material";
import {
  CloseButton,
  EditButton,
  ProgressIconContainer,
  StyledCardContent,
  TypographyTranslation,
  TypographyWord,
  TypographyWordShadow,
  WordInfoContainer,
} from "./WordCard.styled";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import AudioPlayer from "../../../../../components/AudioPlayer";
import ProgressIcon from "../../../../../components/ProgressIcon";

interface WordCardProps {
  wordData: Word;
  handleEdit: () => void;
  handleDialogClose: () => void;
}

const WordCard = ({
  wordData,
  handleEdit,
  handleDialogClose,
}: WordCardProps) => {
  return (
    <Card sx={{ width: "100%", height: 1, overflow: "auto" }}>
      <StyledCardContent>
        <Box>
          <TypographyWordShadow>{wordData.word}</TypographyWordShadow>
          <TypographyWord>{wordData.word}</TypographyWord>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {wordData.audioURL ? (
              <AudioPlayer
                audioURL={wordData.audioURL}
                pronunciation={wordData.pronunciation}
              />
            ) : (
              !!wordData.pronunciation && (
                <Typography>[{wordData.pronunciation}]</Typography>
              )
            )}
          </Box>
        </Box>

        <Tooltip title="Your progress" sx={{ zIndex: 1 }}>
          <ProgressIconContainer>
            <ProgressIcon progress={wordData.learning.progress} />
          </ProgressIconContainer>
        </Tooltip>

        <Tooltip title="Edit">
          <EditButton aria-label="edit" onClick={handleEdit}>
            <EditRounded />
          </EditButton>
        </Tooltip>

        <Tooltip title="Close">
          <CloseButton aria-label="close" onClick={handleDialogClose}>
            <CloseRounded />
          </CloseButton>
        </Tooltip>

        {wordData.translation && (
          <TypographyTranslation variant="h6">
            {wordData.translation}
          </TypographyTranslation>
        )}

        {wordData.definitions.map((def, index) => (
          <WordInfoContainer key={index}>
            <Box mt={2} textAlign="center">
              {def.partOfSpeech && (
                <Divider>
                  <Typography variant="h6" color="text.secondary">
                    {def.partOfSpeech}
                  </Typography>
                </Divider>
              )}
              <Typography variant="h6" fontWeight={400}>
                {def.definition}
              </Typography>
            </Box>

            <Box mt={2} textAlign="center">
              {def.synonyms && (
                <Box>
                  <Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Synonyms:{" "}
                    </Typography>
                    <Typography component="span" color="text.secondary">
                      {def.synonyms.join(", ")}
                    </Typography>
                  </Typography>
                </Box>
              )}
              {def.examples && (
                <Box>
                  <Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Example:{" "}
                    </Typography>
                    {def.examples.map((example) => (
                      <Typography
                        component="span"
                        key={wordData.word}
                        color="text.secondary"
                      >
                        {example}
                      </Typography>
                    ))}
                  </Typography>
                </Box>
              )}
            </Box>
          </WordInfoContainer>
        ))}
      </StyledCardContent>
    </Card>
  );
};

export default WordCard;
