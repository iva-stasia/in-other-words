import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setWordDataDialog } from "../store/slices/dialogSlice";
import { CloseRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { db } from "../firebase";
import useOwnWordData from "../hooks/useOwnWordData";

const WordDataDialog = () => {
  const dispatch = useDispatch();
  const { isWordDataDialogOpen } = useSelector(
    (state: RootState) => state.dialog
  );
  const { word } = useSelector((state: RootState) => state.selectedWord);
  const [wordData] = useOwnWordData(word);
  // const { uid } = useSelector((state: RootState) => state.user);

  // const isWordInfoDialogOpen = true;

  // console.log(wordData);

  // useEffect(() => {
  // }, [word]);

  const handleDialogClose = () => {
    dispatch(setWordDataDialog(false));
  };

  return (
    wordData && (
      <>
        <Dialog
          open={isWordDataDialogOpen}
          onClose={handleDialogClose}
          fullWidth
        >
          {/* <form onSubmit={handleSubmit}> */}
          <DialogTitle variant="h3" color="tertiary.main" textAlign="center">
            {wordData.word}
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>{wordData.definition}</Typography>
          </DialogContent>
          <DialogActions sx={{ p: "0 1.5rem 1rem" }}>
            {/* <Button onClick={handleDialogClose}>Close</Button> */}
            {/* <Tooltip
              title={(!word || !value) && "Fill in all fields"}
              placement="top"
            >
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!word || !value}
                >
                  Add
                </Button>
              </Box>
            </Tooltip> */}
          </DialogActions>
          {/* </form> */}
        </Dialog>
        {/* <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          Word has been successfully added!
        </Alert>
      </Snackbar> */}
      </>
    )
  );
};

export default WordDataDialog;
