import { ReactNode } from "react";
import { WordSet } from ".";
import { AlertColor } from '@mui/material';

export interface DrawerWidthProp {
  drawerWidth: number;
}

export interface NavItemProps {
  title: string;
  icon: ReactNode;
  path: string;
}

export interface UserProfileMenuProps {
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (anchorElUser: null | HTMLElement) => void;
}

export interface SearchProps {
  withIcon: boolean;
  inDialog: boolean;
}

export interface AudioPlayerProps {
  audioURL: string;
  pronunciation?: string;
}

export interface AlertMessageProps {
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  message: string;
  severity: AlertColor;
}

export interface JdenticonGeneratorProps {
  value: string;
}

export interface CreateSetDialogProps {
  currentSets: WordSet[];
}

export interface DeleteSetDialogProps {
  deleteSetOpen: boolean;
  set: WordSet;
  setDeleteSetOpen: (deleteSetOpen: boolean) => void;
}
