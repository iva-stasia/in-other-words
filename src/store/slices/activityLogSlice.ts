import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

const initialState: { activityLog: Timestamp[] } = {
  activityLog: [],
};

export const activityLogSlice = createSlice({
  name: "activityLog",
  initialState,
  reducers: {
    setActivityLog: (state, action: PayloadAction<Timestamp[]>) => {
      state.activityLog = action.payload;
    },
  },
});

export const { setActivityLog } = activityLogSlice.actions;
export default activityLogSlice.reducer;
