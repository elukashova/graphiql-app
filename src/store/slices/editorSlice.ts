import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://data-api.oxilor.com/graphql';
export const REQUEST = `query {
  searchRegions(searchTerm: "Madeira") {
    id
    name
    type
  }
}
`;

export interface Variables {
  [key: string]: unknown;
}

export interface Headers {
  [key: string]: unknown;
}

export interface FetchFormResponseArgs {
  query: string;
  url?: string;
  variables?: Variables;
  headers?: Headers;
}

export interface FetchFormResponseResult {
  formResponse: string;
}

export interface EditorState {
  formValue: string;
  formResponse: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EditorState = {
  formValue: REQUEST,
  formResponse: 'Please, submit for response.',
  status: 'idle',
  error: null,
};

export const fetchFormResponse = createAsyncThunk<FetchFormResponseResult, FetchFormResponseArgs>(
  'editor/fetchFormResponse',
  async ({ query, url = URL, variables, headers }): Promise<FetchFormResponseResult> => {
    const body: string = variables
      ? JSON.stringify({ query, variables })
      : JSON.stringify({ query });
    const res: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      body,
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      console.log('errorResponse', errorResponse);
      throw new Error(JSON.stringify(errorResponse));
    } else {
      const result = await res.json();
      console.log('result', result);
      return { formResponse: JSON.stringify(result) };
    }
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
        console.log('editorSlice loading');
      })
      .addCase(fetchFormResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('editorSlice succeeded', action.payload.formResponse);
        state.formResponse = action.payload.formResponse;
      })
      .addCase(fetchFormResponse.rejected, (state, action) => {
        state.status = 'failed';
        console.log('editorSlice failed', action.error, action.error.message);
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateFormValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
