import { Box, Fade, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../../../store/slices/dialogSlice";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { setSelectedWord } from "../../../store/slices/wordSlice";
import UpdateWordDialog from "../UpdateWordDialog";
import { useRef, useState } from "react";
import { StyledContainer, NavButton } from "./WordDataDialog.styled";
import WordCard from "./components/WordCard";
import { AnimatePresence, motion } from "framer-motion";
import { wordCardNav } from "../../../utils/motion";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const WordDataDialog = () => {
  const dispatch = useDispatch();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef(null);
  const isWordDataDialogOpen = useSelector(
    (state: RootState) => state.dialog.isWordDataDialogOpen
  );
  const { selectedWord, ownSortedWords } = useSelector(
    (state: RootState) => state.words
  );

  const [wordData] = ownSortedWords.filter(
    (word) => word.word === selectedWord?.word
  );
  const wordId = ownSortedWords.indexOf(wordData);

  const handleDialogClose = () => {
    dispatch(setWordDataDialog(false));
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target !== containerRef.current) return;
    handleDialogClose();
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleBackClick = (newDirection: number) => {
    const prevWord =
      wordId - 1 >= 0
        ? ownSortedWords[wordId - 1]
        : ownSortedWords[ownSortedWords.length - 1];
    dispatch(setSelectedWord({ word: prevWord.word, source: "ownDictionary" }));
    paginate(newDirection);
  };

  const handleForwardClick = (newDirection: number) => {
    const nextWord =
      wordId < ownSortedWords.length - 1
        ? ownSortedWords[wordId + 1]
        : ownSortedWords[0];
    dispatch(setSelectedWord({ word: nextWord.word, source: "ownDictionary" }));
    paginate(newDirection);
  };

  const handleEdit = () => {
    setUpdateOpen(true);
  };

  return (
    wordData && (
      <>
        <Modal
          open={isWordDataDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="modal-word-info"
          closeAfterTransition
        >
          <Fade in={isWordDataDialogOpen}>
            <StyledContainer
              ref={containerRef}
              onClick={(e) => handleContainerClick(e)}
            >
              <NavButton onClick={() => handleBackClick(-1)} size="large">
                <ArrowBackIosNewRounded fontSize="inherit" />
              </NavButton>

              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <Box
                  component={motion.div}
                  width={1}
                  key={wordData.word}
                  custom={direction}
                  variants={wordCardNav}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.1,
                    },
                    opacity: { duration: 0.1 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      handleForwardClick(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      handleBackClick(-1);
                    }
                  }}
                  sx={{
                    order: { xs: "-1", sm: "0" },
                    height: { xs: "70%", sm: "50%" },
                  }}
                >
                  <WordCard
                    wordData={wordData}
                    handleEdit={handleEdit}
                    handleDialogClose={handleDialogClose}
                  />
                </Box>
              </AnimatePresence>

              <NavButton onClick={() => handleForwardClick(1)} size="large">
                <ArrowForwardIosRounded fontSize="inherit" />
              </NavButton>
            </StyledContainer>
          </Fade>
        </Modal>

        {updateOpen && (
          <UpdateWordDialog
            open={updateOpen}
            wordData={wordData}
            setOpen={setUpdateOpen}
          />
        )}
      </>
    )
  );
};

export default WordDataDialog;
