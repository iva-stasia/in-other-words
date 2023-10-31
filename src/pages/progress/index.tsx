import { ProgressContainer, Row } from "./Progress.styled";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import CustomCalendar from "./components/CastomCalendar";
import useGetUserActivity from "../../hooks/useGetUserActivity";
import Chart from "./components/Chart";
import Total from "./components/Total";
import Achievements from "./components/Achievements";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMemo } from "react";
import { Progress } from "../../types";
import { Timestamp } from "firebase/firestore";
import { isHasPrevious } from "../../utils/dateComparison";

const getCurrentStreak = (activityLog: Timestamp[]) => {
  let streak = 1;

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

const getStreakRecord = (activityLog: Timestamp[]) => {
  let streakRecord = 0;
  let current = 1;

  const reversedDates = [...activityLog].reverse();

  for (let i = 0; i < reversedDates.length - 1; i++) {
    if (isHasPrevious(reversedDates[i], reversedDates[i + 1])) {
      current++;
    } else {
      streakRecord = Math.max(current, streakRecord);
      current = 0;
    }
  }

  return streakRecord;
};

const ProgressPage = () => {
  const activityLog = useGetUserActivity();
  const words = useSelector((state: RootState) => state.words.ownWords);

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
      variants={fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Row>
        <CustomCalendar activityLog={activityLog} />
        <Chart />
      </Row>

      <Row flex={1}>
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
