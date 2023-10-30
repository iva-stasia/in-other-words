import { Box, Stack, Typography } from "@mui/material";
import { AchievementsContainer } from "./achievements.styled";
import { streakAchievements } from "../../../../constants/achievements";

const Achievements = () => {
  return (
    <AchievementsContainer>
      <Typography variant="h6">Achievements</Typography>
      <Typography variant="subtitle2">Streak</Typography>
      <Stack direction="row">
        {streakAchievements.map(({ title, days, icon }) => (
          <Box key={title} flex={1}>
            <Box component="img" src={icon} width={64}></Box>
            <Typography variant="subtitle2">{title}</Typography>
          </Box>
        ))}
      </Stack>
    </AchievementsContainer>
  );
};

export default Achievements;
