import { updateObject } from '@/store/Context/utility';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { createContext, Dispatch, Reducer } from 'react';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { NextRouter } from 'next/router';

export const BookingDetailContext = createContext<IBookingDetailContext>(
  null as IBookingDetailContext
);

export interface IBookingDetailContext {
  state: BookingDetailState;
  dispatch: Dispatch<BookingDetailAction>;
}

export type BookingDetailState = {
  readonly room: RoomIndexRes | null;
};

export type BookingDetailAction = {
  type: 'setRoom';
  payload: RoomIndexRes;
};

export const BookingDetailStateInit: BookingDetailState = {
  room: null
};

export const BookingDetailReducer: Reducer<BookingDetailState, BookingDetailAction> = (
  state: BookingDetailState,
  action: BookingDetailAction
): BookingDetailState => {
  switch (action.type) {
    case 'setRoom':
      return updateObject<BookingDetailState>(state, { room: action.payload });
    default:
      return state;
  }
};

export const getRoomBookingDetail = async (
  id: any,
  dispatch: Dispatch<BookingDetailAction>,
  router: NextRouter
) => {
  try {
    const res: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${id}?include=details,media`);
    dispatch({ type: 'setRoom', payload: res.data.data });
  } catch (error) {
    router.push('/');
  }
};
