import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { colorModeInitialState, mode } from '../../types';

const initialState: colorModeInitialState = {
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
    setPreferColorMode: (state, action: PayloadAction<mode>) => {
      state.preferredMode = action.payload;
    },
  },
});

export const { toggleColorMode, setPreferColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
