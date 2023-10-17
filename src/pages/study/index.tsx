import { Box, Grid, Link, Typography } from "@mui/material";
import flashcardIcon from "/flashcard.png";
import reviewIcon from "/review.png";
import { Link as RouterLink } from "react-router-dom";
import { BgImage, StyledCard, StyledCardContent } from "./Study.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Progress, Word } from "../../types";
import * as dayjs from "dayjs";

const studyModes = [
  {
    title: "Flashcards",
    path: "flashcards",
    icon: flashcardIcon,
    description:
      "Master new words effortlessly with flashcards. Flip to reveal definitions.",
    getWords: (words: Word[]) =>
      words.filter(({ learning }) => learning.progress === Progress.New),
  },
  {
    title: "Review",
    path: "review",
    icon: reviewIcon,
    description: "Check how well you remember the words you have learned.",
    getWords: (words: Word[]) =>
      words.filter(
        ({ learning }) =>
          dayjs().diff(dayjs(learning.dueDate.toDate()), "day") >= 0
      ),
  },
];

const getWordAccToNum = (words: Word[]) => {
  return words.length === 1 ? "word" : `${words.length} words`;
};

const Study = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  return (
    <Box mt={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
        mt={2}
      >
        {studyModes.map(({ title, path, icon, description, getWords }) => {
          const curWords = getWords(words);
          const active = !!curWords.length;
          const wordAccToNum = getWordAccToNum(curWords);

          return (
            <Grid item xs={12} sm={6} lg={3} key={title}>
              <Link
                component={RouterLink}
                to={`/study/${path}`}
                underline="none"
                sx={{ pointerEvents: curWords.length ? "auto" : "none" }}
              >
                <StyledCard elevation={0} active={active}>
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
                  <BgImage icon={icon} />
                </StyledCard>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Study;
