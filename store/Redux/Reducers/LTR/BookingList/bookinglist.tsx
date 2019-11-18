import { updateObject } from '@/store/Context/utility';
import { Pagination } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import Router from 'next/router';
import qs from 'query-string';
import { Dispatch, Reducer } from 'redux';

export type BookingListReducerState = {
  readonly bookingList_ST: any;
  readonly bookingList_LT: any;
  readonly meta: Pagination | null;
  readonly metaLT: Pagination | null;
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly searchName: string;
  readonly room_id: number;
  readonly codeBooking: string;
  readonly statusBooking: number;
  readonly currentTab: number;
  readonly error: boolean;
};

export const init: BookingListReducerState = {
  bookingList_ST: [],
  bookingList_LT: [],
  meta: null,
  metaLT: null,
  startDate: null,
  endDate: null,
  searchName: null,
  room_id: null,
  codeBooking: null,
  statusBooking: 0,
  currentTab: 0,
  error: false
};

export type BookingListReducerAction =
  | { type: 'setBookingListST'; payload: any; meta?: Pagination | null }
  | { type: 'setBookingListLT'; payload: any; metaLT?: Pagination | null }
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_END_DATE'; payload: string }
  | { type: 'SET_SEARCH_NAME'; payload: string }
  | { type: 'SET_ID_ROOM'; payload: number }
  | { type: 'SET_CODE_BOOKING'; payload: string }
  | { type: 'SET_STATUS_BOOKING'; payload: number }
  | { type: 'SET_CURRENT_TAB'; payload: number }
  | { type: 'setError'; payload: boolean };

export const bookingListReducer: Reducer<BookingListReducerState, BookingListReducerAction> = (
  state: BookingListReducerState = init,
  action: BookingListReducerAction
): BookingListReducerState => {
  switch (action.type) {
    case 'setBookingListST':
      return updateObject(state, { bookingList_ST: action.payload, meta: action.meta || null });
    case 'setBookingListLT':
      return updateObject(state, { bookingList_LT: action.payload, metaLT: action.metaLT || null });
    case 'SET_START_DATE':
      return updateObject(state, { startDate: action.payload });
    case 'SET_END_DATE':
      return updateObject(state, { endDate: action.payload });
    case 'SET_SEARCH_NAME':
      return updateObject(state, { searchName: action.payload });
    case 'SET_ID_ROOM':
      return updateObject(state, { room_id: action.payload });
    case 'SET_CODE_BOOKING':
      return updateObject(state, { codeBooking: action.payload });
    case 'SET_STATUS_BOOKING':
      return updateObject(state, { statusBooking: action.payload });
    case 'SET_CURRENT_TAB':
      return updateObject(state, { currentTab: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getBookingListST = async (dispatch: Dispatch<BookingListReducerAction>, dataFilter?: any): Promise<any> => {
  try {
    let params = Router.query;
    let query = {
      size: 10,
      include: 'room.details',
      q: dataFilter ? dataFilter.nameSearch : '',
      date_start: dataFilter ? dataFilter.date_start : '',
      date_end: dataFilter ? dataFilter.date_end : '',
      status: dataFilter ? dataFilter.status : '',
      room_id: dataFilter ? dataFilter.room_id: '',
      page: params.page
    };
    const url = `bookings?${qs.stringify(query)}`;
    const res: any = await axios_merchant.get(url);
    const bookingListST = res.data.data;
    if (bookingListST) {
      dispatch({ type: 'setBookingListST', payload: bookingListST, meta: res.data.meta });
    }
    return bookingListST;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const getBookingListLT = async (dispatch: Dispatch<BookingListReducerAction>, dataFilter?: any): Promise<any> => {
  try {
    let params = Router.query;
    let query = {
      size: 10,
      include: 'contracts,longTermRoom',
      q: dataFilter ? dataFilter.nameSearch : '',
      date_start: dataFilter ? dataFilter.date_start : '',
      date_end: dataFilter ? dataFilter.date_end : '',
      status: dataFilter ? dataFilter.status : '',
      room_id: dataFilter ? dataFilter.room_id: '',
      booking_code: dataFilter ? dataFilter.booking_code :'',
      page: params.page
    };
    const url = `long-term-bookings?${qs.stringify(query)}`;
    const res: any = await axios_merchant.get(url);
    const bookingListLT = res.data.data;
    if (bookingListLT) {
      dispatch({ type: 'setBookingListLT', payload: bookingListLT, metaLT: res.data.meta });
    }
    return bookingListLT;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
