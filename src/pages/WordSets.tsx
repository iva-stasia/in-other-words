import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  ButtonBase,
  IconButton,
  Link,
  Tooltip,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import JdenticonGenerator from "../components/JdenticonGenerator";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import CreateSetDialog from "./dialogs/CreateSetDialog";
import { useDispatch } from "react-redux";
import { setCreateSetDialog } from "../store/slices/dialogSlice";
import { WordSet } from "../types";
import { Link as RouterLink } from "react-router-dom";
import DeleteSetDialog from "./dialogs/DeleteSetDialog";
import { TransitionGroup } from "react-transition-group";

const WordSets = () => {
  const dispatch = useDispatch();
  const activePage = useSelector((state: RootState) => state.menu.activePage);
  const wordSets = useSelector((state: RootState) => state.words.wordSets);
  const [deleteSetOpen, setDeleteSetOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<WordSet | null>(null);
  const loading = useSelector((state: RootState) => state.words.loading);

  const handleCreateSetClick = () => {
    dispatch(setCreateSetDialog(true));
  };

  const handleDeleteSet = (event: React.MouseEvent, set: WordSet) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedSet(set);
    setDeleteSetOpen(true);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography
        mb={2}
        variant="h5"
        noWrap
        component="div"
        sx={{ fontWeight: 600 }}
      >
        {activePage}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        alignItems="stretch"
      >
        <TransitionGroup component={null}>
          <Grid item xs={6} sm={3} lg={2}>
            <ButtonBase
              focusRipple
              disableRipple
              onClick={handleCreateSetClick}
              sx={{
                height: 1,
                width: "100%",
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                "&:hover, &.Mui-focusVisible": {
                  "& .MuiCard-root": {
                    bgcolor: "background.default",
                  },
                },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: 1,
                  width: "100%",
                  border: "2px dashed",
                  borderColor: "primary.main",
                  bgcolor: "backgroundSecond.main",
                  transition: (theme) =>
                    theme.transitions.create("background-color"),
                }}
              >
                <Box position="relative">
                  <AddRounded
                    fontSize="large"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "primary.main",
                    }}
                  />
                  <Box sx={{ opacity: "0.15" }}>
                    <JdenticonGenerator value="0" />
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div" color="primary">
                    Create new set
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>

          {!!wordSets.length &&
            wordSets.map((set) => (
              <Fade>
                <Grid item xs={6} sm={3} lg={2} key={set.title}>
                  <Link
                    component={RouterLink}
                    to={`/word-sets/${set.title}`}
                    underline="none"
                  >
                    <Card
                      sx={{
                        height: 1,
                        cursor: "pointer",
                        transition: (theme) =>
                          theme.transitions.create("background-color"),
                        "&:hover .MuiBox-root > .MuiBox-root": {
                          scale: "1.2",
                        },
                      }}
                      elevation={0}
                    >
                      <Box position="relative" overflow="hidden">
                        <Box
                          sx={{
                            opacity: "0.8",
                            height: "fit-content",
                            transition: (theme) =>
                              theme.transitions.create("scale"),
                          }}
                        >
                          <JdenticonGenerator value={set.pictureId} />
                        </Box>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="close"
                            onClick={(e) => handleDeleteSet(e, set)}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: "background.default",
                              bgcolor: "text.secondary",
                              "&:hover": {
                                bgcolor: "text.primary",
                              },
                            }}
                          >
                            <DeleteRounded />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {set.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
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
    </Box>
  );
};

export default WordSets;
