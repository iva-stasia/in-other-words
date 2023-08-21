import { DeleteRounded, FilterListRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
// import { arrayRemove, doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Word } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import AlertMessage from "../AlertMessage";
import { deleteWord } from "../../utils";

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

  const getMessage = () => {
    return selected.length > 1
      ? `${selected.length} words have been successfully deleted!`
      : "Word has been successfully deleted!";
  };

  const handleDeleteClick = () => {
    const newMessage = getMessage();
    setMessage(newMessage);
    selected.map(async (word) => await deleteWord(word, uid));
    setSelected([]);
    setAlertOpen(true);
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
      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={message}
        severity="success"
      />
    </>
  );
};

export default EnhancedTableToolbar;
