import { DriveFileMoveRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import { WordSet } from "../../../../../../types";

interface ChangeSetProps {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (anchorElUser: null | HTMLElement) => void;
  handleMoveClick: (set: WordSet) => void;
}

const ChangeSet = ({
  anchorElUser,
  setAnchorElUser,
  handleMoveClick,
}: ChangeSetProps) => {
  const wordSets = useSelector((state: RootState) => state.words.wordSets);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Move to another set">
        <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
          <DriveFileMoveRounded />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu"
        anchorEl={anchorElUser}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        <MenuItem divider disabled>
          <Typography textAlign="center" variant="body2">
            Move to:
          </Typography>
        </MenuItem>
        {wordSets.map((set) => (
          <MenuItem key={set.title} onClick={() => handleMoveClick(set)}>
            <Typography textAlign="center">{set.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChangeSet;
