import { Modal } from "@mui/material";
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

const WordDataDialog = () => {
  const dispatch = useDispatch();
  const [updateOpen, setUpdateOpen] = useState(false);
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
    dispatch(setSelectedWord(null));
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target !== containerRef.current) return;
    handleDialogClose();
  };

  const handleBackClick = () => {
    const prevWord =
      wordId - 1 > 0
        ? ownSortedWords[wordId - 1]
        : ownSortedWords[ownSortedWords.length - 1];
    dispatch(setSelectedWord({ word: prevWord.word, source: "ownDictionary" }));
  };

  const handleForwardClick = () => {
    const nextWord =
      wordId < ownSortedWords.length - 1
        ? ownSortedWords[wordId + 1]
        : ownSortedWords[0];
    dispatch(setSelectedWord({ word: nextWord.word, source: "ownDictionary" }));
  };

  const handleEdit = () => {
    setUpdateOpen(true);
    dispatch(setWordDataDialog(false));
  };

  return (
    wordData && (
      <>
        <Modal
          open={isWordDataDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="modal-word-info"
        >
          <StyledContainer
            ref={containerRef}
            onClick={(e) => handleContainerClick(e)}
            maxWidth="sm"
          >
            <NavButton onClick={handleBackClick} size="large">
              <ArrowBackIosNewRounded fontSize="inherit" />
            </NavButton>

            <WordCard
              wordData={wordData}
              handleEdit={handleEdit}
              handleDialogClose={handleDialogClose}
            />

            <NavButton onClick={handleForwardClick} size="large">
              <ArrowForwardIosRounded fontSize="inherit" />
            </NavButton>
          </StyledContainer>
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
