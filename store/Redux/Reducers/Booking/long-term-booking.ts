import qs from 'query-string';
import { LTBookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '@/store/Context/utility';
import {
  Pagination,
  BaseResponse,
} from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { Dispatch, Reducer } from 'redux';
import Router from 'next/router';

export type LongTermBookingAction =
  | { type: 'SET_DATA_BOOKING_BY_STATUS'; payload: LTBookingIndexRes[]; meta?: Pagination | null }
  | { type: 'SET_META_BOOKING'; payload: Pagination }
  | { type: 'setError'; payload: boolean };

export type LongTermBookingState = {
  readonly bookings: LTBookingIndexRes[];
  readonly meta: Pagination | null;
  readonly error: boolean;
}
export const init: LongTermBookingState = {
  bookings: [],
  meta: null,
  error: false
};

export const longTermBookingReducer: Reducer<LongTermBookingState, LongTermBookingAction> = (
  state: LongTermBookingState = init,
  action: LongTermBookingAction
) => {
  switch (action.type) {
    case 'SET_DATA_BOOKING_BY_STATUS':
      return updateObject(state, { bookings: action.payload, meta: action.meta || null });
    case 'SET_META_BOOKING':
      return updateObject(state, { meta: action.payload });
      case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getLongTermBookingList = async (
  dispatch: Dispatch<LongTermBookingAction>,
  status: string[],
): Promise<BaseResponse<LTBookingIndexRes[]>> => {
  try {
    let params = Router.query;
    let statusList = status.join();
    let query = {
      size: 10,
      include: 'contracts,longTermRoom',
      status: statusList,
      page: params.page
    };
    const url = `long-term-bookings?${qs.stringify(query)}`;
    const res: any = await axios.get(url);
    const bookingListLT = res.data.data;
    dispatch({ type: 'SET_DATA_BOOKING_BY_STATUS', payload: bookingListLT, metaLT: res.data.meta });
    return bookingListLT;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
