import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { updateObject } from '@/store/Context/utility';
import { Reducer, Dispatch } from 'redux';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import Cookies from 'universal-cookie';
export type ListingDetailsReducerState = {
  listing: LTRoomIndexRes;
  disable_save: boolean;
  error: boolean;
};

export const init: ListingDetailsReducerState = {
  listing: null,
  disable_save: false,
  error: false
};

export type ListingDetailsReducerAction =
  | { type: 'setListing'; payload: LTRoomIndexRes }
  | { type: 'setDisableSave'; payload: boolean }
  | { type: 'setError'; payload: boolean };

export const listingDetailsReducer: Reducer<
  ListingDetailsReducerState,
  ListingDetailsReducerAction
> = (
  state: ListingDetailsReducerState = init,
  action: ListingDetailsReducerAction
): ListingDetailsReducerState => {
  switch (action.type) {
    case 'setListing':
      return updateObject(state, { listing: action.payload });
    case 'setDisableSave':
      return updateObject(state, { disable_save: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getListingDetails = async (
  id: any,
  dispatch: Dispatch<ListingDetailsReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing = res.data.data;
    if (listing) {
      dispatch({ type: 'setListing', payload: listing });
    }
    return listing;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const handleUpdateListing = async (room_id: any, data: any) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.put(
    `long-term/room/separate-update/${room_id}`,
    data,
    headers
  );

  return response.data;
};
