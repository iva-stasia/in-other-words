import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PasswordResetInitialState {
  isResetEmailSent: boolean;
}

const initialState: PasswordResetInitialState = {
  isResetEmailSent: false,
};

export const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    toggleResetEmail: (state, action: PayloadAction<boolean>) => {
      state.isResetEmailSent = action.payload;
    },
  },
});

export const { toggleResetEmail } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
