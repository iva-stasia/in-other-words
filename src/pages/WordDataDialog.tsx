import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../store/slices/dialogSlice";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  CloseRounded,
} from "@mui/icons-material";
import { useEffect } from "react";
import { db } from "../firebase";
import { setSelectedWord } from "../store/slices/wordSlice";
import AudioPlayer from "../components/AudioPlayer";

const WordDataDialog = () => {
  const dispatch = useDispatch();
  const { isWordDataDialogOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { selectedWord } = useSelector(
    (state: RootState) => state.selectedWord
  );
  const { ownSortedWords } = useSelector(
    (state: RootState) => state.selectedWord
  );
  const [wordData] = ownSortedWords.filter(
    (word) => word.word === selectedWord?.word
  );
  const wordId = ownSortedWords.indexOf(wordData);

  const handleDialogClose = () => {
    dispatch(setWordDataDialog(false));
    dispatch(setSelectedWord(null));
  };

  const handleBackClick = () => {
    const prevWord = ownSortedWords[wordId - 1];
    dispatch(setSelectedWord({ word: prevWord.word, source: "ownDictionary" }));
  };

  const handleForwardClick = () => {
    const nextWord = ownSortedWords[wordId + 1];
    dispatch(setSelectedWord({ word: nextWord.word, source: "ownDictionary" }));
  };

  return (
    wordData && (
      <>
        <Modal
          open={isWordDataDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="modal-word-info"
        >
          <Container
            maxWidth="sm"
            sx={{
              width: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleBackClick}
              size="large"
              disabled={wordId === 0}
              sx={(theme) => ({
                m: 2,
                color:
                  theme.palette.mode === "light"
                    ? "background.default"
                    : "text.primary",
              })}
            >
              <ArrowBackIosNewRounded fontSize="inherit" />
            </IconButton>
            <Card sx={{ width: "100%" }}>
              <CardContent
                sx={{ overflow: "hidden", position: "relative", p: 4 }}
              >
                <Typography
                  variant="h3"
                  color="tertiary.main"
                  textAlign="center"
                >
                  {wordData.word}
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -70,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontFamily: "Kavoon",
                      fontSize: "8rem",
                      opacity: 0.08,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {wordData.word}
                  </Typography>
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleDialogClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "text.disabled",
                    "&:hover": {
                      color: "text.secondary",
                    },
                  }}
                >
                  <CloseRounded />
                </IconButton>
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
                <Box mt={2} textAlign="center">
                  {wordData.partOfSpeech && (
                    <Divider>
                      <Typography variant="h6" color="text.secondary">
                        {wordData.partOfSpeech}
                      </Typography>
                    </Divider>
                  )}
                  <Typography variant="h6" fontWeight={400}>
                    {wordData.definition}
                  </Typography>
                </Box>
                {wordData.synonyms && (
                  <Box mt={3} textAlign="center">
                    <Divider>
                      <Typography color="text.secondary" fontWeight={600}>
                        Synonyms
                      </Typography>
                    </Divider>
                    <Typography color="text.secondary">
                      {wordData.synonyms.join(", ")}
                    </Typography>
                  </Box>
                )}
                {wordData.examples && (
                  <Box mt={3} textAlign="center">
                    <Divider>
                      <Typography color="text.secondary" fontWeight={600}>
                        Example
                      </Typography>
                    </Divider>
                    {wordData.examples.map((example) => (
                      <Typography key={wordData.word} color="text.secondary">
                        {example}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
              {/* <CardActions>
              </CardActions> */}
            </Card>
            <IconButton
              onClick={handleForwardClick}
              size="large"
              disabled={wordId === ownSortedWords.length - 1}
              sx={(theme) => ({
                m: 2,
                color:
                  theme.palette.mode === "light"
                    ? "background.default"
                    : "text.primary",
              })}
            >
              <ArrowForwardIosRounded fontSize="inherit" />
            </IconButton>
          </Container>
        </Modal>
      </>
    )
  );
};

export default WordDataDialog;
