import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const URL = 'https://data-api.oxilor.com/graphql';
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
  formResponse: '',
  status: 'idle',
  error: null,
};

export const fetchFormResponse = createAsyncThunk<FetchFormResponseResult, FetchFormResponseArgs>(
  'editor/fetchFormResponse',
  async ({
    query,
    url = URL,
    variables,
    headers,
  }): Promise<{
    formResponse: string;
  }> => {
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
      throw new Error(JSON.stringify(errorResponse));
    } else {
      const result = await res.json();
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
      })
      .addCase(fetchFormResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formResponse = action.payload.formResponse;
        state.error = null;
      })
      .addCase(fetchFormResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
        state.formResponse = '';
      });
  },
});

export const { updateFormValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
