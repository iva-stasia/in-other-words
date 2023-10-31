import { TotalCell, TotalContainer } from "./Total.styled";
import { Stack, Typography } from "@mui/material";
import {
  BookRounded,
  EmojiEventsRounded,
  GradeRounded,
  WhatshotRounded,
} from "@mui/icons-material";

interface TotalProps {
  allWordsCount: number;
  learnedWordsCount: number;
  currentStreak: number;
  streakRecord: number;
}

const Total = ({
  allWordsCount,
  learnedWordsCount,
  currentStreak,
  streakRecord,
}: TotalProps) => {
  return (
    <TotalContainer>
      <TotalCell>
        <Typography variant="h6">Streak</Typography>
        <Stack direction="row" spacing={4}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <WhatshotRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">{currentStreak}</Typography>
            </Stack>
            <Typography variant="subtitle2">Current streak</Typography>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <EmojiEventsRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">{streakRecord}</Typography>
            </Stack>
            <Typography variant="subtitle2">Streak record</Typography>
          </Stack>
        </Stack>
      </TotalCell>

      <TotalCell>
        <Typography variant="h6">Words</Typography>
        <Stack direction="row" spacing={4}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <GradeRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">{learnedWordsCount}</Typography>
            </Stack>
            <Typography variant="subtitle2">Learned words</Typography>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <BookRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">{allWordsCount}</Typography>
            </Stack>
            <Typography variant="subtitle2">Total word count</Typography>
          </Stack>
        </Stack>
      </TotalCell>
    </TotalContainer>
  );
};

export default Total;
