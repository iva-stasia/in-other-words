import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type mode = 'light' | 'dark';

interface colorModeInitialState {
  setMode: mode | null;
  preferredMode: mode;
}

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
