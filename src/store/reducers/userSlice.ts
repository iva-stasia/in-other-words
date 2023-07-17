import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserInitialState {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const initialState: UserInitialState = {
  displayName: '',
  email: '',
  photoURL: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User | null>) => {
      state.displayName = action.payload?.displayName || null;
      state.email = action.payload?.email || null;
      state.photoURL = action.payload?.photoURL || null;
    },
  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
