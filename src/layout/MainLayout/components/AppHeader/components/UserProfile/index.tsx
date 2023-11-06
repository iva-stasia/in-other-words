import { useState } from "react";
import UserProfileMenu from "./components/UserProfileMenu";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";

const UserProfile = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { displayName, photoURL } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton
          onClick={(e) => setAnchorElUser(e.currentTarget)}
          sx={{ p: 0 }}
        >
          <Avatar
            alt={displayName || "User"}
            src={photoURL || ""}
            sx={{ backgroundColor: "backgroundSecond.main" }}
          />
        </IconButton>
      </Tooltip>
      <UserProfileMenu
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
      />
    </Box>
  );
};

export default UserProfile;
