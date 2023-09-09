import { Box, Grid, Link, Typography } from "@mui/material";
import flashcardIcon from "../../assets/images/icons/flashcard.png";
import reviewIcon from "../../assets/images/icons/review.png";
import { Link as RouterLink } from "react-router-dom";
import { BgImage, StyledCard, StyledCardContent } from "./Study.styled";

const studyModes = [
  {
    title: "Flashcards",
    path: "flashcards",
    icon: flashcardIcon,
    description:
      "Master new words effortlessly with flashcards. Flip to reveal definitions.",
  },
  {
    title: "Review",
    path: "review",
    icon: reviewIcon,
    description: "Check how well you remember the words you have learned.",
  },
];

const StudyPage = () => {
  return (
    <Box mt={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
        mt={2}
      >
        {studyModes.map(({ title, path, icon, description }) => (
          <Grid item xs={12} sm={6} lg={3} key={title}>
            <Link component={RouterLink} to={`/study/${path}`} underline="none">
              <StyledCard elevation={0}>
                <StyledCardContent>
                  <Typography variant="h6" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </StyledCardContent>
                <BgImage icon={icon} />
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudyPage;
