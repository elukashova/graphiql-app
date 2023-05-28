import { Reducer, AnyAction } from 'redux';

export interface VariablesState {
  variables: string | null;
}

export const initialState: VariablesState = {
  variables: null,
};

export const SET_VARIABLES = 'SET_VARIABLES';

export interface SetVariablesAction {
  type: typeof SET_VARIABLES;
  payload: string;
}

export type VariablesActionTypes = SetVariablesAction;

const variablesReducer: Reducer<VariablesState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VARIABLES':
      return {
        ...state,
        variables: action.payload,
      };
    default:
      return state;
  }
};

export default variablesReducer;

export function setVariables(variables: string): SetVariablesAction {
  return { type: SET_VARIABLES, payload: variables };
}
