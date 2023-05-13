import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
type Docs = {
  isDocs: boolean;
};

const initialState: Docs = { isDocs: false };

export const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setDocs: (state, { payload }: PayloadAction<Docs>) => {
      state.isDocs = !state.isDocs;
    },
  },
});

export const { setDocs } = docsSlice.actions;

export const selectDocs = (state: RootState) => state.docs;

export const docsReducer = docsSlice.reducer;
