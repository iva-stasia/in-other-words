import { DeleteRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Dispatch, SetStateAction, useState } from "react";
import AlertMessage from "../../../AlertMessage";
import { deleteWord, updateWord } from "../../../../utils";
import { Word, WordSet } from "../../../../types";
import ChangeSet from "./components/ChangeSet";
import Filters from "./components/Filters";

interface EnhancedTableToolbarProps {
  selected: Word[];
  setSelected: Dispatch<SetStateAction<Word[]>>;
}

const getDeleteMessage = (words: Word[]) => {
  return words.length > 1
    ? `${words.length} words have been successfully deleted!`
    : "Word has been successfully deleted!";
};

const getMoveMessage = (words: Word[], set: WordSet) => {
  return words.length > 1
    ? `${words.length} words have been successfully moved to ${set.title}!`
    : `Word has been successfully moved to ${set.title}!`;
};

const EnhancedTableToolbar = ({
  selected,
  setSelected,
}: EnhancedTableToolbarProps) => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleDeleteClick = () => {
    const newMessage = getDeleteMessage(selected);
    setMessage(newMessage);
    selected.map(async (word) => await deleteWord(word, uid));
    setSelected([]);
    setAlertOpen(true);
  };

  const handleMoveClick = (set: WordSet) => {
    const newMessage = getMoveMessage(selected, set);
    setMessage(newMessage);
    selected.map(async (word) => await updateWord(uid, word, set.title));
    setSelected([]);
    setAlertOpen(true);
    setAnchorElUser(null);
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
          <>
            <ChangeSet
              anchorElUser={anchorElUser}
              setAnchorElUser={setAnchorElUser}
              handleMoveClick={handleMoveClick}
            />

            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteClick()}>
                <DeleteRounded />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Filters />
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
