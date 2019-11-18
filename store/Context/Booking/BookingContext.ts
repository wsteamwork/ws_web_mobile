import { createContext, Dispatch, Reducer } from 'react';
import { updateObject } from '../utility';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { LTBookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { LTBookingReq } from '@/types/Requests/Booking/BookingRequests';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';

export const BookingContext = createContext<IBookingContext>(null as IBookingContext);

export interface IBookingContext {
  state: BookingState;
  dispatch: Dispatch<BookingAction>;
}

export type BookingState = {
  readonly checkin: string | null;
  readonly checkout: string | null;
  readonly booking_type: number;
  readonly number_of_guests: number;
};

export type BookingAction =
  | { type: 'SET_CHECK_IN'; payload: string }
  | { type: 'SET_CHECK_OUT'; payload: string }
  | { type: 'SET_BOOKING_TYPE'; payload: number }
  | { type: 'SET_NUMBER_OF_GUESTS'; payload: number };

export const BookingStateInit: BookingState = {
  checkin: moment().format(DEFAULT_DATE_FORMAT),
  checkout: '',
  booking_type: 2,
  number_of_guests: 1
};

export const BookingReducer: Reducer<BookingState, BookingAction> = (
  state: BookingState,
  action: BookingAction
) => {
  switch (action.type) {
    case 'SET_CHECK_IN':
      return updateObject(state, { checkin: action.payload });
    case 'SET_CHECK_OUT':
      return updateObject(state, { checkout: action.payload });
    case 'SET_BOOKING_TYPE':
      return updateObject(state, { booking_type: action.payload });
    case 'SET_NUMBER_OF_GUESTS':
      return updateObject(state, { number_of_guests: action.payload });
    default:
      return state;
  }
};

export const getLTCalculatedBookingPrice = async (
  idRoom: any,
  move_in: string,
  move_out: string
): Promise<LTBookingPriceCalculatorRes> => {
  const req: LTBookingReq = {
    long_term_room_id: parseInt(idRoom),
    move_in,
    move_out
  };

  const res: AxiosRes<LTBookingPriceCalculatorRes> = await axios.post(
    `long-term-bookings/price-calculator`,
    req
  );

  return res.data.data;
};
