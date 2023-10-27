import { Grid, Fade } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setCreateSetDialog } from "../../store/slices/dialogSlice";
import { WordSet } from "../../types";
import { TransitionGroup } from "react-transition-group";
import { WordSetsContainer } from "./WordSets.styled";
import CreateSetBtn from "./components/CreateSetBtn";
import SetCard from "./components/SetCard";
import CreateSetDialog from "./components/CreateSetDialog";
import DeleteSetDialog from "./components/DeleteSetDialog";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const WordSets = () => {
  const dispatch = useDispatch();
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  const [deleteSetOpen, setDeleteSetOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<WordSet | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreateSetClick = () => {
    dispatch(setCreateSetDialog(true));
    if (buttonRef.current === null) return;
    buttonRef.current.blur();
  };

  const handleDeleteSet = (event: React.MouseEvent, set: WordSet) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedSet(set);
    setDeleteSetOpen(true);
  };

  return (
    <WordSetsContainer
      component={motion.div}
      variants={fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
      >
        <Grid item xs={6} sm={4} lg={2}>
          <CreateSetBtn
            buttonRef={buttonRef}
            handleCreateSetClick={handleCreateSetClick}
          />
        </Grid>

        <TransitionGroup component={null}>
          {!!wordSets.length &&
            wordSets.map((set) => (
              <Fade key={set.title}>
                <Grid item xs={6} sm={4} lg={2} key={set.title}>
                  <SetCard set={set} handleDeleteSet={handleDeleteSet} />
                </Grid>
              </Fade>
            ))}
        </TransitionGroup>
      </Grid>

      <CreateSetDialog currentSets={wordSets} />

      {selectedSet && (
        <DeleteSetDialog
          deleteSetOpen={deleteSetOpen}
          set={selectedSet}
          setDeleteSetOpen={setDeleteSetOpen}
        />
      )}
    </WordSetsContainer>
  );
};

export default WordSets;
