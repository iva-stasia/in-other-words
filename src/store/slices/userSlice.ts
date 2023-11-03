import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LearningLogRecord, UserData } from "../../types";

const initialState: UserData = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  learningLog: [],
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
    setLearningLog: (state, action: PayloadAction<LearningLogRecord[]>) => {
      state.learningLog = action.payload;
    },
  },
});

export const { saveUser, setLearningLog } = userSlice.actions;
export default userSlice.reducer;
