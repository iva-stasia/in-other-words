import { DeleteRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Word } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import SuccessMessage from "../SuccessMessage";

interface EnhancedTableToolbarProps {
  selected: Word[];
  setSelected: Dispatch<SetStateAction<Word[]>>;
}

const EnhancedTableToolbar = ({
  selected,
  setSelected,
}: EnhancedTableToolbarProps) => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");

  const deleteWord = async (word: Word) => {
    const newMessage =
      selected.length > 1
        ? `${selected.length} words have been successfully deleted!`
        : "Word has been successfully deleted!";
    if (uid) {
      try {
        await updateDoc(doc(db, "userWords", uid), {
          words: arrayRemove(word),
        });
        setMessage(newMessage);
        setSelected([]);
        setAlertOpen(true);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  const handleDeleteClick = () => {
    selected.map(async (word) => await deleteWord(word));
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        {selected.length > 0 && (
          <Typography
            mr={2}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteClick()}>
              <DeleteRounded />
            </IconButton>
          </Tooltip>
        ) : (
          // <Tooltip title="Filter list">
          <IconButton onClick={() => console.log("Filtered!")} disabled>
            <FilterListRounded />
          </IconButton>
          // </Tooltip>
        )}
      </Stack>
      <SuccessMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={message}
      />
    </>
  );
};

export default EnhancedTableToolbar;
