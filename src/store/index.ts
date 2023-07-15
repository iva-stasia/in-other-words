import { combineReducers, configureStore } from '@reduxjs/toolkit';
import colorModeReducer from './reducers/colorModeSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  colorMode: colorModeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['colorMode'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
