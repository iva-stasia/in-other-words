import { ReactNode } from 'react';

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