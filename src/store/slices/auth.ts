import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Auth } from '../../auth/auth.types';
import { AuthState } from '../store.types';

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, { payload }: PayloadAction<Auth>) => {
      state.isAuth = payload.isAuth;
      state.userEmail = payload.userEmail;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsAuth, setIsLoading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
