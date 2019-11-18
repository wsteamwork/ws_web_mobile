import { updateObject } from '@/store/Context/utility';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Dispatch, Reducer } from 'redux';
import Cookies from 'universal-cookie';

export type DetailsReducerState = {
  room_id: number;
  step: string;
  disable_next: boolean;
  listing: any;
  error: boolean;
};

export const init: DetailsReducerState = {
  room_id: null,
  step: null,
  disable_next: false,
  listing: null,
  error: false
};

export type DetailsReducerAction =
  | { type: 'setRoomId'; payload: number }
  | { type: 'setStep'; payload: string }
  | { type: 'setDisableNext'; payload: boolean }
  | { type: 'setListing'; payload: any }
  | { type: 'setError'; payload: boolean };

export const detailsReducer: Reducer<DetailsReducerState, DetailsReducerAction> = (
  state: DetailsReducerState = init,
  action: DetailsReducerAction
): DetailsReducerState => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject(state, { room_id: action.payload });
    case 'setStep':
      return updateObject(state, { step: action.payload });
    case 'setDisableNext':
      return updateObject(state, { disable_next: action.payload });
    case 'setListing':
      return updateObject(state, { listing: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getListingDetails = async (
  id: any,
  dispatch: Dispatch<DetailsReducerAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing = res.data.data;
    const room_id = listing.room_id;
    if (listing) {
      dispatch({ type: 'setRoomId', payload: room_id });
      dispatch({ type: 'setListing', payload: listing });
    }
    return listing;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const handleDetailsListing = async (room_id: number, tab: string, data: any) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.post(
    `long-term/room/step2/${tab}/${room_id}`,
    {
      step2: {
        [`${tab}`]: data
      }
    },
    headers
  );

  return response.data;
};
