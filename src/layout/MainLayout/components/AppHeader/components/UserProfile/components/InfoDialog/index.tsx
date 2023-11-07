import { OpenInNewRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import {
  apiResources,
  graphicResources,
  technologies,
} from "../../../../../../../../constants/resources";
import { contacts } from "../../../../../../../../constants/contacts";

interface InfoDialogProps {
  infoOpen: boolean;
  setInfoOpen: (infoOpen: boolean) => void;
}

interface LinkToResourceProps {
  title: string;
  path: string;
}

const LinkToResource = ({ title, path }: LinkToResourceProps) => (
  <Link
    href={path}
    underline="none"
    target="_blank"
    rel="noopener"
    display="inline-block"
  >
    <Stack direction="row" spacing={1} alignItems="center" component="span">
      <Typography component="span">{title}</Typography>
      <ListItemIcon>
        <OpenInNewRounded fontSize="small" />
      </ListItemIcon>
    </Stack>
  </Link>
);

const InfoDialog = ({ infoOpen, setInfoOpen }: InfoDialogProps) => {
  const handleClose = () => {
    setInfoOpen(false);
  };

  return (
    <Dialog
      open={infoOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">
        Resources used to create this app
      </DialogTitle>
      <DialogContent dividers={true}>
        <List
          subheader={
            <ListSubheader disableSticky disableGutters>
              API
            </ListSubheader>
          }
        >
          {apiResources.map((api) => (
            <ListItem disableGutters key={api.title}>
              <ListItemText
                primary={<LinkToResource path={api.path} title={api.title} />}
                secondary={api.desc}
              />
              {api.avatar && (
                <ListItemAvatar sx={{ minWidth: "50px" }}>
                  <Avatar
                    alt={api.title}
                    src={api.avatar}
                    sx={{ width: "50px", height: "50px" }}
                    variant="square"
                  />
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
        </List>

        <List
          subheader={
            <ListSubheader disableSticky disableGutters>
              Graphics
            </ListSubheader>
          }
        >
          {graphicResources.map((graphic) => (
            <ListItem disableGutters key={graphic.title}>
              <ListItemText
                primary={
                  <LinkToResource path={graphic.path} title={graphic.title} />
                }
                secondary={graphic.desc}
              />
            </ListItem>
          ))}
        </List>

        <List
          subheader={
            <ListSubheader disableSticky disableGutters>
              Technologies
            </ListSubheader>
          }
        >
          <ListItem disableGutters>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {technologies.map((tech) => (
                <Link
                  href={tech.path}
                  target="_blank"
                  rel="noopener"
                  key={tech.title}
                >
                  {tech.avatar ? (
                    <Chip
                      sx={{
                        cursor: "pointer",
                        "& .MuiChip-avatarColorPrimary": {
                          backgroundColor: "transparent",
                        },
                      }}
                      avatar={<Avatar alt={tech.title} src={tech.avatar} />}
                      label={tech.title}
                      color="primary"
                    />
                  ) : (
                    <Chip
                      sx={{
                        cursor: "pointer",
                        "& .MuiChip-avatarColorPrimary": {
                          backgroundColor: "transparent",
                        },
                      }}
                      label={tech.title}
                      color="primary"
                    />
                  )}
                </Link>
              ))}
            </Stack>
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
          pl={1}
        >
          {contacts.map((contact) => (
            <Link
              href={contact.path}
              target="_blank"
              rel="noopener"
              key={contact.title}
              underline="none"
              color="inherit"
              sx={{ display: "flex" }}
            >
              {contact.icon}
            </Link>
          ))}
        </Stack>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
