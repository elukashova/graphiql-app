import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { editorReducer } from './slices/editor';
import variablesReducer from './variablesReducer';
import { routeReducer } from './slices/route';

const store = configureStore({
  reducer: {
    auth: authReducer,
    route: routeReducer,
    editor: editorReducer,
    variables: variablesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
