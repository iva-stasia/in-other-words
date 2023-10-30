import { Timestamp } from "firebase/firestore";
import { TotalCell, TotalContainer } from "./Total.styled";
import { Stack, Typography } from "@mui/material";
import {
  BookRounded,
  EmojiEventsRounded,
  GradeRounded,
  WhatshotRounded,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useMemo } from "react";
import { Progress } from "../../../../types";

interface TotalProps {
  activityLog: Timestamp[];
}

const Total = ({ activityLog }: TotalProps) => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const allWordsCount = words.length;
  const learnedWordsCount = useMemo(
    () =>
      words.filter((word) => word.learning.progress === Progress.Learned)
        .length,
    [words]
  );

  return (
    <TotalContainer>
      <TotalCell>
        <Typography variant="h6">Streak</Typography>
        <Stack direction="row" spacing={4}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <WhatshotRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">1</Typography>
            </Stack>
            <Typography variant="subtitle2">Current streak</Typography>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <EmojiEventsRounded sx={{ color: "tertiary.main" }} />
              <Typography variant="h6">1</Typography>
            </Stack>
            <Typography variant="subtitle2">Previous record</Typography>
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
