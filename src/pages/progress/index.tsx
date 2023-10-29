import { ProgressContainer } from "./Progress.styled";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import CustomCalendar from "./components/CastomCalendar";

const Progress = () => {
  return (
    <ProgressContainer
      component={motion.div}
      variants={fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <CustomCalendar />
    </ProgressContainer>
  );
};

export default Progress;
