import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../../store/slices/dialogSlice";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  CloseRounded,
  EditRounded,
} from "@mui/icons-material";
import { setSelectedWord } from "../../store/slices/wordSlice";
import AudioPlayer from "../../components/AudioPlayer";
import UpdateWordDialog from "./UpdateWordDialog";
import { useState } from "react";

const WordDataDialog = () => {
  const dispatch = useDispatch();
  const [updateOpen, setUpdateOpen] = useState(false);
  const isWordDataDialogOpen = useSelector(
    (state: RootState) => state.dialog.isWordDataDialogOpen
  );
  const { selectedWord, ownSortedWords } = useSelector(
    (state: RootState) => state.words
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

  const handleEdit = () => {
    setUpdateOpen(true);
    dispatch(setWordDataDialog(false));
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
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              alignItems: { xs: "flex-end", sm: "center" },
              justifyContent: { xs: "space-between", sm: "center" },
              "&:focus-visible": {
                outline: "none",
              },
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
            <Card sx={{ width: "100%", order: { xs: "-1", sm: "0" } }}>
              <CardContent
                sx={{ overflow: "hidden", position: "relative", p: 4 }}
              >
                <Typography
                  color="tertiary.main"
                  textAlign="center"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3rem" },
                    wordBreak: "break-all",
                    hyphens: "auto",
                  }}
                >
                  {wordData.word}
                </Typography>
                <Typography
                  color="tertiary.main"
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
                <IconButton
                  aria-label="close"
                  onClick={handleEdit}
                  sx={{
                    position: "absolute",
                    right: 48,
                    top: 8,
                    color: "text.disabled",
                    "&:hover": {
                      color: "text.secondary",
                    },
                  }}
                >
                  <EditRounded />
                </IconButton>
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
                {wordData.definitions.map((def, index) => (
                  <Box key={index}>
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
                  </Box>
                ))}
              </CardContent>
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
        {updateOpen && (
          <UpdateWordDialog
            open={updateOpen}
            wordData={wordData}
            setOpen={setUpdateOpen}
          />
        )}
      </>
    )
  );
};

export default WordDataDialog;
