import { Box, Grid, Typography } from "@mui/material";
import {
  AchievementsContainer,
  BadgeContainer,
  BadgeTitle,
} from "./achievements.styled";
import {
  streakAchievements,
  wordAchievements,
} from "../../../../constants/achievements";
import question from "/achievements/question-mark.png";

interface AchievementsProps {
  learnedWordsCount: number;
}

const Achievements = ({ learnedWordsCount }: AchievementsProps) => {
  return (
    <AchievementsContainer>
      <Typography variant="h6">Achievements</Typography>
      <Box flex={1}>
        <Typography variant="subtitle2" color="tertiary.main" pb={1}>
          Daily streaks
        </Typography>

        <Grid container rowGap={2} columnSpacing={1}>
          {streakAchievements.map(({ title, days, icon }) => (
            <Grid item xs={6} sm={4} md key={title}>
              <BadgeContainer>
                <Box component="img" src={icon} width={48} />
                <BadgeTitle variant="subtitle2" requiredNum={days} type="days">
                  {title}
                </BadgeTitle>
              </BadgeContainer>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="tertiary.main" pb={1}>
          Learned words
        </Typography>

        <Grid container rowGap={2} columnSpacing={1}>
          {wordAchievements.map(({ title, words, icon }) => (
            <Grid item xs={6} sm={4} md key={title}>
              <BadgeContainer>
                <Box
                  component="img"
                  src={learnedWordsCount < words ? question : icon}
                  width={48}
                />
                <BadgeTitle
                  variant="subtitle2"
                  requiredNum={words}
                  type="words"
                >
                  {title}
                </BadgeTitle>
              </BadgeContainer>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AchievementsContainer>
  );
};

export default Achievements;
