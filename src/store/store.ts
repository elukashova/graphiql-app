import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { editorReducer } from './slices/editor';

const store = configureStore({
  reducer: {
    auth: authReducer,
    editor: editorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
