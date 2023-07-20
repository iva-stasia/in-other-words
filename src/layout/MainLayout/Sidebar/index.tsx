import {
  AddRounded,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Mail,
  Menu,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { DrawerWidthProp } from '../../../types';

const Sidebar = ({ drawerWidth }: DrawerWidthProp) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          gap: '1rem',
          // bgcolor: 'secondary.main',
          border: 'none',
        },
      }}
      variant="permanent"
      anchor="left">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography
          variant="h6"
          color="primary"
          fontFamily="Kavoon"
          noWrap
          p={0}
          component="div">
          In Other Words
        </Typography>
      </Toolbar>
      {/* <Divider variant="middle" /> */}
      {/* <Box p={2}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<AddRounded />}>
          Add new word
        </Button>
      </Box> */}
      <Box px={2}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: 'text.secondary' }} selected={true}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    p={0}
                    component="span">
                    Selected
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {['All words', 'Word Sets', 'Study', 'Progress'].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{ color: 'text.secondary' }}
                  selected={false}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        p={0}
                        component="span">
                        {text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
