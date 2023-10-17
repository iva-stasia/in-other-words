import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DialogInitialState {
  isAddWordDialogOpen: boolean;
  isWordDataDialogOpen: boolean;
  isCreateSetDialogOpen: boolean;
}

const initialState: DialogInitialState = {
  isAddWordDialogOpen: false,
  isWordDataDialogOpen: false,
  isCreateSetDialogOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setAddWordDialog: (state, action: PayloadAction<boolean>) => {
      state.isAddWordDialogOpen = action.payload;
    },
    setWordDataDialog: (state, action: PayloadAction<boolean>) => {
      state.isAddWordDialogOpen = false;
      state.isWordDataDialogOpen = action.payload;
    },
    setCreateSetDialog: (state, action: PayloadAction<boolean>) => {
      state.isCreateSetDialogOpen = action.payload;
    },
  },
});

export const { setAddWordDialog, setWordDataDialog, setCreateSetDialog } =
  dialogSlice.actions;
export default dialogSlice.reducer;
