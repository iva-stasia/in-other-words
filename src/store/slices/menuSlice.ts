import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NavInitialState as MenuInitialState } from '../../types';

const initialState: MenuInitialState = {
  activePage: 'All words',
  isOpen: true,
};

export const menuSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setActivePage, toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
