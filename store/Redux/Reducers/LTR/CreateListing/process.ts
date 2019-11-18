import { updateObject } from '@/store/Context/utility';
import { Reducer } from 'redux';

export type ProcessReducerState = {
    currentActiveStep: string;
    directFromProcess: boolean;
};

export const init: ProcessReducerState = {
    currentActiveStep: '0',
    directFromProcess: false,
};

export type ProcessReducerAction =
  | { type: 'setActiveStepListing'; payload: string }
  | { type: 'setDirectFromProcess'; payload: boolean };
 
export const processReducer: Reducer<ProcessReducerState, ProcessReducerAction> = (
  state: ProcessReducerState = init,
  action: ProcessReducerAction
): ProcessReducerState => {
  switch (action.type) {
    case 'setActiveStepListing':
      return updateObject(state, { currentActiveStep: action.payload });
    case 'setDirectFromProcess':
      return updateObject(state, { directFromProcess: action.payload });
    default:
      return state;
  }
};
