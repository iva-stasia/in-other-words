import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorModeInitialState } from '../../types';
import { PaletteMode } from '@mui/material';

const initialState: ColorModeInitialState = {
  setMode: null,
  preferredMode: 'light',
};

export const colorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.setMode = state.setMode === 'light' ? 'dark' : 'light';
    },
    setPreferColorMode: (state, action: PayloadAction<PaletteMode>) => {
      state.preferredMode = action.payload;
    },
  },
});

export const { toggleColorMode, setPreferColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
