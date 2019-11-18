import { createContext, Dispatch, Reducer } from 'react';
import { updateObject } from '../utility';
// import { headers } from '@/utils/axiosInstance.ts';

export const CreateListingContext = createContext<ICreateListingContext>(
  null as ICreateListingContext
);

export interface ICreateListingContext {
  state: CreateListingState;
  dispatch: Dispatch<CreateListingAction>;
}

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly listings: any;
};

export type CreateListingAction =
  | { type: 'setLeaseType'; payload: number }
  | { type: 'setAccommodationType'; payload: number }
  | { type: 'setStayWithHost'; payload: number }
  | { type: 'setGuestRecommendation'; payload: number }
  | { type: 'setMaxGuest'; payload: number }
  | { type: 'setListings'; listings: any };

export const CreateListingInit: CreateListingState = {
  leaseType: null,
  accommodationType: null,
  stayWithHost: null,
  guestRecommendation: null,
  maxGuest: null,
  listings: null
};

export const CreateListingReducer: Reducer<CreateListingState, CreateListingAction> = (
  state: CreateListingState,
  action: CreateListingAction
): CreateListingState => {
  switch (action.type) {
    case 'setLeaseType':
      return updateObject<CreateListingState>(state, { leaseType: action.payload });
    case 'setAccommodationType':
      return updateObject<CreateListingState>(state, { accommodationType: action.payload });
    case 'setStayWithHost':
      return updateObject<CreateListingState>(state, { stayWithHost: action.payload });
    case 'setGuestRecommendation':
      return updateObject<CreateListingState>(state, { guestRecommendation: action.payload });
    case 'setMaxGuest':
      return updateObject<CreateListingState>(state, { maxGuest: action.payload });
    case 'setListings':
      return updateObject<CreateListingState>(state, { listings: action.listings });

    default:
      return state;
  }
};
