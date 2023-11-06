import { DoneAllRounded, NotificationsRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import useGetNotifications from "../../../../../../hooks/useGetNotifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useReward } from "react-rewards";
import useUpdateNotifications from "../../../../../../hooks/useUpdateNotifications";

dayjs.extend(relativeTime);

const config = {
  emoji: ["🚀", "✨", "⭐️"],
  elementCount: 100,
  zIndex: 9999,
  spread: 300,
  lifetime: 200,
  startVelocity: 20,
};

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const notifications = useGetNotifications();
  const { reward } = useReward("rewardId", "emoji", config);
  const updateNotifications = useUpdateNotifications();

  const unreadNotification = useMemo(
    () => notifications.filter((notification) => !notification.read),
    [notifications]
  );

  const handleClick = (path: string, id: string) => {
    updateNotifications(id, true).catch(console.error);

    if (path === "welcome") {
      reward();
    }
  };

  const handleMarkAll = () => {
    notifications.map(async ({ id }) => await updateNotifications(id, true));
  };

  return (
    <>
      <IconButton
        size="medium"
        aria-label="show notifications"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={unreadNotification.length} color="primary">
          <NotificationsRounded />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        elevation={6}
        sx={{ mt: 1 }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            minWidth: 300,
            bgcolor: "background.paper",
          }}
        >
          <ListItem disablePadding>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width={1}
              pb={1}
            >
              <Typography py={1} px={2} variant="subtitle2">
                Notifications
              </Typography>
              <Tooltip title="Mark all as read">
                <IconButton sx={{ mr: "8px" }} onClick={handleMarkAll}>
                  <DoneAllRounded />
                </IconButton>
              </Tooltip>
            </Stack>
          </ListItem>
          <Divider />

          {notifications.map(({ text, date, icon, read, path, id }) => {
            const emojiCharacter = String.fromCodePoint(parseInt(icon, 16));

            const dDate = dayjs(date.toDate());
            const dateDiff = dayjs().diff(dDate, "day");
            const dateToDisplay =
              dateDiff > 7 ? dDate.format("MMM D, YYYY") : dDate.fromNow();

            return (
              <ListItem disablePadding key={date.toString()}>
                <ListItemButton
                  sx={{ borderRadius: 0 }}
                  disabled={Boolean(read)}
                  onClick={() => handleClick(path, id)}
                  id={path === "welcome" ? "rewardId" : ""}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        fontSize: "1.5rem",
                        backgroundColor: "transparent",
                      }}
                    >
                      {emojiCharacter}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={text} secondary={dateToDisplay} />
                  {!read && (
                    <ListItemSecondaryAction>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          backgroundColor: "tertiary.main",
                          borderRadius: "50%",
                        }}
                      />
                    </ListItemSecondaryAction>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;
