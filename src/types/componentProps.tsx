import { ReactNode } from "react";
import { WordSet } from '.';

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

export interface SuccessMessageProps {
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  message: string;
}

export interface JdenticonGeneratorProps {
  value: string;
}

export interface CreateSetDialogProps {
  currentSets: WordSet[];
}
