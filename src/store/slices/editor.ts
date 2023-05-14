import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface EditorState {
  formValue: string;
  formResponse: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EditorState = {
  formValue: 'query { characters(filter: { name: "Morty" }) { results { name status species } } }',
  formResponse: 'Please, submit for response.',
  status: 'idle',
  error: null,
};

export const fetchFormResponse = createAsyncThunk(
  'editor/fetchFormResponse',
  async ({
    query,
    url,
    variables,
    headers,
  }: {
    query: string;
    url: string;
    variables?: Record<string, unknown>;
    headers?: Record<string, string>;
  }) => {
    const body = variables ? JSON.stringify({ query, variables }) : JSON.stringify({ query });
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      body,
    });
    const result = await res.json();
    return JSON.stringify(result);
  }
);

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state.formValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formResponse = action.payload;
      })
      .addCase(fetchFormResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateFormValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
