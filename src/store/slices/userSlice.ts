import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../types";

const initialState: UserData = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserData | null>) => {
      state.uid = action.payload?.uid || null;
      state.displayName = action.payload?.displayName || null;
      state.email = action.payload?.email || null;
      state.photoURL = action.payload?.photoURL || null;
    },
  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
