import { ProgressContainer, Row } from "./Progress.styled";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import CustomCalendar from "./components/CastomCalendar";
import useGetUserActivity from "../../hooks/useGetUserActivity";
import Chart from "./components/Chart";
import Total from "./components/Total";
import Achievements from "./components/Achievements";

const Progress = () => {
  const activityLog = useGetUserActivity();

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
        <Achievements />
        <Total activityLog={activityLog} />
      </Row>
    </ProgressContainer>
  );
};

export default Progress;
