import { Box, Grid, Link, Typography } from "@mui/material";
import flashcardIconLight from "/flashcard-light.png";
import flashcardIconDark from "/flashcard-dark.png";
import reviewIconLight from "/review-light.png";
import reviewIconDark from "/review-dark.png";
import wordDefIconLight from "/word-def-light.png";
import wordDefIconDark from "/word-def-dark.png";
import defWordIconLight from "/def-word-light.png";
import defWordIconDark from "/def-word-dark.png";
import crosswordIconLight from "/crossword-light.png";
import crosswordIconDark from "/crossword-dark.png";
import { Link as RouterLink } from "react-router-dom";
import {
  BgImage,
  StudyContainer,
  StyledCard,
  StyledCardContent,
} from "./Study.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Progress, Word } from "../../types";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const studyModes = [
  {
    title: "Flash Cards",
    path: "/flashcards",
    iconLight: flashcardIconLight,
    iconDark: flashcardIconDark,
    minWordsRequired: 1,
    description:
      "Master new words effortlessly with flashcards. Flip to reveal definitions.",
    getWords: (words: Word[]) =>
      words.filter(({ learning }) => learning.progress === Progress.New),
  },
  {
    title: "Repetition",
    path: "/repetition",
    iconLight: reviewIconLight,
    iconDark: reviewIconDark,
    minWordsRequired: 1,
    description: "Check how well you remember the words you have learned.",
    getWords: (words: Word[]) =>
      words.filter(
        (word) =>
          dayjs().diff(dayjs(word.learning.dueDate.toDate()), "minute") >= 0 &&
          dayjs(word.createdAt.toDate()).diff(
            dayjs(word.learning.dueDate.toDate()),
            "minute"
          ) !== 0
      ),
  },
  {
    title: "Word - Definition",
    path: "/word-definition",
    iconLight: wordDefIconLight,
    iconDark: wordDefIconDark,
    minWordsRequired: 10,
    description:
      "Learn the meaning and context of individual words to build your linguistic skills effectively.",
    getWords: (words: Word[]) =>
      words.filter(({ learning }) => learning.progress !== Progress.Learned),
  },
  {
    title: "Definition - Word",
    path: "/definition-word",
    iconLight: defWordIconLight,
    iconDark: defWordIconDark,
    minWordsRequired: 10,
    description:
      "Learn the meaning and context of individual words to build your linguistic skills effectively.",
    getWords: (words: Word[]) =>
      words.filter(({ learning }) => learning.progress !== Progress.Learned),
  },
  {
    title: "Crossword",
    path: "",
    iconLight: crosswordIconLight,
    iconDark: crosswordIconDark,
    minWordsRequired: 10,
    description: "Coming soon!",
    getWords: (_words: Word[]) => [],
  },
];

const getWordAccToNum = (wordsNum: number) => {
  return wordsNum === 1 ? "word" : "words";
};

const getToBeAccToNum = (wordsNum: number) => {
  return wordsNum === 1 ? "is" : "are";
};

const Study = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  return (
    <StudyContainer
      component={motion.div}
      variants={fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
        mt={2}
      >
        {studyModes.map(
          (
            {
              title,
              path,
              iconLight,
              iconDark,
              description,
              minWordsRequired,
              getWords,
            },
            index
          ) => {
            const curWords = getWords(words);
            const active = curWords.length >= minWordsRequired;
            const wordAccToNum = getWordAccToNum(curWords.length);
            const mainMode = index === 0 || index === 1;

            return (
              <Grid item xs={12} sm={6} lg={mainMode ? 6 : 3} key={title}>
                <Link
                  component={RouterLink}
                  to={active ? `/study${path}` : ""}
                  underline="none"
                  sx={{ pointerEvents: active ? "auto" : "none" }}
                >
                  <StyledCard elevation={0} active={active} main={mainMode}>
                    <StyledCardContent>
                      <Box>
                        <Typography variant="h6" component="div">
                          {title}
                        </Typography>
                        <Typography variant="body2" component="div">
                          {curWords.length} {wordAccToNum}
                        </Typography>

                        {!active && (
                          <Typography variant="body2" component="div">
                            At least {minWordsRequired - curWords.length} more{" "}
                            {getWordAccToNum(
                              minWordsRequired - curWords.length
                            )}{" "}
                            {getToBeAccToNum(
                              minWordsRequired - curWords.length
                            )}{" "}
                            needed to start training
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    </StyledCardContent>

                    <BgImage
                      iconLight={iconLight}
                      iconDark={iconDark}
                      main={mainMode}
                    />
                  </StyledCard>
                </Link>
              </Grid>
            );
          }
        )}
      </Grid>
    </StudyContainer>
  );
};

export default Study;
