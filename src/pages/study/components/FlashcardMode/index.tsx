import { Box, Typography } from "@mui/material";
import FlippedCard from "./components/FlippedCard";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import {
  BtnContainer,
  CardContainer,
  CommonCardContainer,
  Container,
  CurrentCardContainer,
  FailBtn,
  PassBtn,
} from "./FlashcardMode.styled";
import { Word } from "../../../../types";
import CardEnd from "./components/CardEnd";
import useFlashcardModeFacade from "./flashcardModeFacade";
import BorderLinearProgress from "../../../../components/BorderLinearProgress";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useState } from "react";

interface FlashcardModeProps {
  words: Word[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: 0,
      rotate: 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      // x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      border: "4px solid blue",
    };
  },
};

const swipeConfidenceThreshold = 5000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const FlashcardMode = ({ words }: FlashcardModeProps) => {
  const {
    wordsToDisplay,
    dragged,
    handleFail,
    handlePass,
    curIndex,
    wordNum,
    setDragged,
  } = useFlashcardModeFacade(words);
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];

  const rotate = useTransform(x, [-1000, 0, 1000], [`-30deg`, "0deg", "30deg"]);

  return (
    <Box
      component={motion.div}
      variants={fadeIn("down", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Container>
        <CardContainer>
          <AnimatePresence initial={false} custom={direction}>
            {wordsToDisplay.map((word, index) => (
              <CommonCardContainer key={word.word} index={index}>
                <CurrentCardContainer
                  key={word.word}
                  style={index === 0 ? { x, rotate } : {}}
                  variants={variants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      // type: "tween",
                      // type: "spring",
                      // stiffness: 300,
                      // damping: 30,
                      duration: 0,
                    },
                    opacity: { duration: 0 },
                  }}
                  drag="x"
                  dragElastic={1}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setDragged(true)}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      setDirection(1);
                      handleFail().catch(console.error);
                    } else if (swipe > swipeConfidenceThreshold) {
                      setDirection(-1);
                      handlePass().catch(console.error);
                    }
                  }}
                  onClick={() => setDragged(false)}
                >
                  <FlippedCard
                    word={word}
                    dragged={dragged}
                    index={index}
                    x={x}
                    xInput={xInput}
                  />
                </CurrentCardContainer>
              </CommonCardContainer>
            ))}
          </AnimatePresence>

          {/* <AnimatePresence initial={false} custom={direction}>
            {wordsToDisplay.map((word, index) => (
              <CommonCardContainer key={word.word} index={index}>
                {index === 0 ? (
                  <CurrentCardContainer
                    key={word.word}
                    style={{ x, rotate }}
                    variants={variants}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: {
                        // type: "spring",
                        // stiffness: 300,
                        // damping: 30,
                        // duration: 5,
                      },
                      opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragElastic={1}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={() => setDragged(true)}
                    onDragEnd={(_e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        setDirection(1);
                        handleFail().catch(console.error);
                      } else if (swipe > swipeConfidenceThreshold) {
                        setDirection(-1);
                        handlePass().catch(console.error);
                      }
                    }}
                    onClick={() => setDragged(false)}
                  >
                    <FlippedCard
                      word={word}
                      dragged={dragged}
                      index={index}
                      x={x}
                      xInput={xInput}
                    />
                  </CurrentCardContainer>
                ) : (
                  <FlippedCard
                    word={word}
                    dragged={dragged}
                    index={index}
                    x={x}
                    xInput={xInput}
                  />
                )}
              </CommonCardContainer>
            ))}
          </AnimatePresence> */}

          <CommonCardContainer index={wordsToDisplay.length}>
            <CardEnd />
          </CommonCardContainer>
        </CardContainer>

        {wordsToDisplay.length > 0 && (
          <>
            <BtnContainer>
              <FailBtn size="large" onClick={handleFail}>
                <CloseRounded fontSize="inherit" />
              </FailBtn>

              <Typography variant="h6">
                {curIndex + 1}/{wordNum}
              </Typography>

              <PassBtn size="large" onClick={handlePass}>
                <CheckRounded fontSize="inherit" />
              </PassBtn>
            </BtnContainer>
            <BorderLinearProgress current={curIndex} total={wordNum} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default FlashcardMode;

// import { Box, Typography } from "@mui/material";
// import FlippedCard from "./components/FlippedCard";
// import { CheckRounded, CloseRounded } from "@mui/icons-material";
// import {
//   BtnContainer,
//   CardContainer,
//   CommonCardContainer,
//   Container,
//   CurrentCardContainer,
//   FailBtn,
//   PassBtn,
// } from "./FlashcardMode.styled";
// import { Word } from "../../../../types";
// import CardEnd from "./components/CardEnd";
// import useFlashcardModeFacade from "./flashcardModeFacade";
// import BorderLinearProgress from "../../../../components/BorderLinearProgress";
// import { motion, useMotionValue } from "framer-motion";
// import { fadeIn } from "../../../../utils/motion";

// interface FlashcardModeProps {
//   words: Word[];
// }

// const variants = {
//   enter: (direction: number) => {
//     return {
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     };
//   },
//   center: {
//     zIndex: 1,
//     x: 0,
//     opacity: 1
//   },
//   exit: (direction: number) => {
//     return {
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     };
//   }
// };

// const FlashcardMode = ({ words }: FlashcardModeProps) => {
//   const {
//     wordsToDisplay,
//     handlePointerDown,
//     handlePointerUp,
//     handleDragMove,
//     isDragging,
//     movingToLeft,
//     movingToRight,
//     translateX,
//     dragged,
//     handleFail,
//     handlePass,
//     curIndex,
//     wordNum,
//   } = useFlashcardModeFacade(words);

//   const x = useMotionValue(0);
//   const xInput = [-100, 0, 100];

//   return (
//     <Box
//       component={motion.div}
//       variants={fadeIn("down", "tween", 0, 0.3)}
//       initial="hidden"
//       animate="show"
//       key={location.pathname}
//     >
//       <Container>
//         <CardContainer>
//           {wordsToDisplay.map((word, index) => (
//             <CommonCardContainer
//               // onPointerDown={handlePointerDown}
//               // onPointerUp={handlePointerUp}
//               // onPointerMove={handleDragMove}
//               key={word.word}
//               index={index}
//             >
//               {index === 0 ? (
//                 <CurrentCardContainer
//                   // isDragging={isDragging}
//                   // movingToLeft={movingToLeft}
//                   // movingToRight={movingToRight}
//                   // translateX={translateX}
//                   component={motion.div}
//                   style={{ x }}
//                   drag="x"
//                   dragElastic={1}
//                   dragConstraints={{ left: 0, right: 0 }}
//                 >
//                   <FlippedCard
//                     word={word}
//                     dragged={dragged}
//                     movingToLeft={movingToLeft}
//                     movingToRight={movingToRight}
//                     index={index}
//                   />
//                 </CurrentCardContainer>
//               ) : (
//                 <FlippedCard
//                   word={word}
//                   dragged={dragged}
//                   movingToLeft={movingToLeft}
//                   movingToRight={movingToRight}
//                   index={index}
//                 />
//               )}
//             </CommonCardContainer>
//           ))}
//           <CommonCardContainer index={wordsToDisplay.length}>
//             <CardEnd />
//           </CommonCardContainer>
//         </CardContainer>

//         {wordsToDisplay.length > 0 && (
//           <>
//             <BtnContainer>
//               <FailBtn size="large" onClick={handleFail}>
//                 <CloseRounded fontSize="inherit" />
//               </FailBtn>

//               <Typography variant="h6">
//                 {curIndex + 1}/{wordNum}
//               </Typography>

//               <PassBtn size="large" onClick={handlePass}>
//                 <CheckRounded fontSize="inherit" />
//               </PassBtn>
//             </BtnContainer>
//             <BorderLinearProgress current={curIndex} total={wordNum} />
//           </>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default FlashcardMode;
