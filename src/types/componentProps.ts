import { Dispatch, ReactNode, SetStateAction } from "react";
import { Order, Word, WordDefinition, WordSet } from ".";
import { AlertColor } from "@mui/material";

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

export interface DefinitionInputProps {
  definitions: WordDefinition[];
  value: WordDefinition | null;
  required: boolean;
  setValue: (value: WordDefinition | null) => void;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Word
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | null;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Word;
  label: string;
  numeric: boolean;
  sortable: boolean;
  mobileDisplay: string;
}

export interface EnhancedTableToolbarProps {
  selected: Word[];
  setSelected: Dispatch<SetStateAction<Word[]>>;
}

export interface WordTableProps {
  words: Word[];
  title: string;
}

export interface WordSetSelectProps {
  required: boolean;
  wordSet: string;
  setWordSet: (set: string) => void;
}

export interface UpdateWordDialogProps {
  open: boolean;
  wordData: Word;
  setOpen: (open: boolean) => void;
}
