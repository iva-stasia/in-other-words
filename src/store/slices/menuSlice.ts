import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NavInitialState as MenuInitialState } from "../../types";

const initialState: MenuInitialState = {
  activePage: "Dictionary",
  isOpen: false,
};

export const menuSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setActivePage, toggleMenu, setMenu } = menuSlice.actions;
export default menuSlice.reducer;
