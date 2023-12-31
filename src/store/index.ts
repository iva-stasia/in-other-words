import { combineReducers, configureStore } from "@reduxjs/toolkit";
import colorModeReducer from "./slices/colorModeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./slices/userSlice";
import passwordResetSlice from "./slices/passwordResetSlice";
import menuSlice from "./slices/menuSlice";
import dialogSlice from "./slices/dialogSlice";
import wordSlice from "./slices/wordSlice";
import activityLogSlice from "./slices/activityLogSlice";

const reducers = combineReducers({
  colorMode: colorModeReducer,
  user: userSlice,
  passwordReset: passwordResetSlice,
  menu: menuSlice,
  dialog: dialogSlice,
  words: wordSlice,
  activityLog: activityLogSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["colorMode", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
