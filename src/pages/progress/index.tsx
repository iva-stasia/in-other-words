import { ProgressContainer, Row } from "./Progress.styled";
import { motion } from "framer-motion";
import { fade, fadeIn } from "../../utils/motion";
import CustomCalendar from "./components/CastomCalendar";
import Chart from "./components/Chart";
import Total from "./components/Total";
import Achievements from "./components/Achievements";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMemo, useState } from "react";
import { Progress } from "../../types";
import { Timestamp } from "firebase/firestore";
import { isHasPrevious } from "../../utils/dateComparison";
import { useMediaQuery, useTheme } from "@mui/material";

const getCurrentStreak = (activityLog: Timestamp[] | undefined): number => {
  let streak = 1;

  if (!activityLog) return 0;

  const reversedDates = [...activityLog].reverse();

  for (let i = 0; i < reversedDates.length - 1; i++) {
    if (isHasPrevious(reversedDates[i], reversedDates[i + 1])) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

const getStreakRecord = (activityLog: Timestamp[] | undefined): number => {
  let streakRecord = 0;
  let current = 1;

  if (!activityLog) return 0;

  const reversedDates = [...activityLog].reverse();

  for (let i = 0; i < reversedDates.length - 1; i++) {
    if (isHasPrevious(reversedDates[i], reversedDates[i + 1])) {
      current++;
    } else {
      streakRecord = Math.max(current, streakRecord);
      current = 0;
    }
  }

  return streakRecord || current;
};

const ProgressPage = () => {
  const activityLog = useSelector(
    (state: RootState) => state.activityLog.activityLog
  );
  const words = useSelector((state: RootState) => state.words.ownWords);
  const [rowHeight, setRowHeight] = useState(0);
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const allWordsCount = words.length;

  const learnedWordsCount = useMemo(
    () =>
      words.filter((word) => word.learning.progress === Progress.Learned)
        .length,
    [words]
  );

  const currentStreak = useMemo(
    () => getCurrentStreak(activityLog),
    [activityLog]
  );

  const streakRecord = useMemo(
    () => getStreakRecord(activityLog),
    [activityLog]
  );

  return (
    <ProgressContainer
      component={motion.div}
      variants={matchDownSm ? fade : fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Row height={rowHeight || "auto"}>
        <CustomCalendar
          activityLog={activityLog || []}
          setRowHeight={setRowHeight}
        />
        <Chart rowHeight={rowHeight} />
      </Row>

      <Row flex={1} component={motion.div}>
        <Achievements
          learnedWordsCount={learnedWordsCount}
          streakRecord={streakRecord}
        />
        <Total
          allWordsCount={allWordsCount}
          learnedWordsCount={learnedWordsCount}
          currentStreak={currentStreak}
          streakRecord={streakRecord}
        />
      </Row>
    </ProgressContainer>
  );
};

export default ProgressPage;
