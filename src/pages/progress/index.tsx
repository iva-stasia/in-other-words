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
        <Achievements learnedWordsCount={learnedWordsCount} />
        <Total
          activityLog={activityLog}
          allWordsCount={allWordsCount}
          learnedWordsCount={learnedWordsCount}
        />
      </Row>
    </ProgressContainer>
  );
};

export default ProgressPage;
