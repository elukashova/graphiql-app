import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Route } from '../store.types';

const initialState: Route = { isSignUp: true, isSignIn: false };

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute: (state, { payload }: PayloadAction<Route>) => {
      state.isSignIn = payload.isSignIn;
      state.isSignUp = payload.isSignUp;
    },
  },
});

export const { setRoute } = routeSlice.actions;

export const selectRoute = (state: RootState) => state.route;

export const routeReducer = routeSlice.reducer;
