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
import { BgImage, StyledCard, StyledCardContent } from "./Study.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Progress, Word } from "../../types";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const studyModes = [
  {
    title: "Flashcards",
    path: "/flashcards",
    iconLight: flashcardIconLight,
    iconDark: flashcardIconDark,
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
    description: "Coming soon!",
    getWords: (_words: Word[]) => [],
  },
];

const getWordAccToNum = (words: Word[]) => {
  return words.length === 1 ? "1 word" : `${words.length} words`;
};

const Study = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  return (
    <Box
      mt={2}
      pb={3}
      sx={{ overflow: "auto", borderRadius: "12px" }}
      component={motion.div}
      variants={fadeIn("up", "tween", 0, 0.5)}
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
            { title, path, iconLight, iconDark, description, getWords },
            index
          ) => {
            const curWords = getWords(words);
            const active = !!curWords.length;
            const wordAccToNum = getWordAccToNum(curWords);
            const mainMode = index === 0 || index === 1;

            return (
              <Grid item xs={12} sm={6} lg={mainMode ? 6 : 3} key={title}>
                <Link
                  component={RouterLink}
                  to={`/study${path}`}
                  underline="none"
                  sx={{ pointerEvents: curWords.length ? "auto" : "none" }}
                >
                  <StyledCard
                    elevation={0}
                    active={active && title !== "Crossword"}
                    main={mainMode}
                  >
                    <StyledCardContent>
                      <Box>
                        <Typography variant="h6" component="div">
                          {title}
                        </Typography>
                        <Typography variant="body2" component="div">
                          {wordAccToNum}
                        </Typography>
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
    </Box>
  );
};

export default Study;
