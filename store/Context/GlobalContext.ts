import { createContext, Dispatch, Reducer } from 'react';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithRouterProps } from 'next/dist/client/with-router';
import { updateObject } from './utility';

export const GlobalContext = createContext<IGlobalContext>(null as IGlobalContext);

export interface IGlobalContext extends WithWidth, WithRouterProps {
  state: GlobalState;
  dispatch: Dispatch<GlobalAction>;
}

export type GlobalState = {
  readonly overlay: boolean;
};

export type GlobalAction = { type: 'setOverlay'; payload: boolean };

export const GlobalStateInit: GlobalState = {
  overlay: false
};

export const GlobalReducer: Reducer<GlobalState, GlobalAction> = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case 'setOverlay':
      return updateObject<GlobalState>(state, { overlay: action.payload });
    default:
      state;
  }
};
