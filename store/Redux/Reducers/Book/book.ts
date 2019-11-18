import qs from 'query-string';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';
import {
  BookingPriceCalculatorRes,
  BookingIndexRes
} from '@/types/Requests/Booking/BookingResponses';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes, AxiosErrorCustom } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import {
  BookingPriceCalculatorReq,
  BookingCreateReq
} from '@/types/Requests/Booking/BookingRequests';
import { Dispatch } from 'react';
import { ReducresActions } from '..';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';

export type BookState = {
  readonly room: RoomIndexRes;
  readonly dataCalculate: BookingPriceCalculatorRes;
  readonly error: boolean;
  readonly dataInvoice: PaymentBankListRes;
};

export type BookActions =
  | { type: 'setRoomBook'; payload: RoomIndexRes }
  | { type: 'setDataCalculate'; payload: BookingPriceCalculatorRes }
  | { type: 'setError'; payload: boolean }
  | { type: 'setInvoice'; payload: PaymentBankListRes };

const init: BookState = {
  room: null,
  dataCalculate: null,
  error: false,
  dataInvoice: null
};

export const bookReducer: Reducer<BookState, BookActions> = (
  state: BookState = init,
  action: BookActions
): BookState => {
  switch (action.type) {
    case 'setRoomBook':
      return updateObject(state, { room: action.payload });
    case 'setDataCalculate':
      return updateObject(state, { dataCalculate: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    case 'setInvoice':
      return updateObject(state, { dataInvoice: action.payload });
    default:
      return state;
  }
};

export const getRoomDetails = async (
  id: any,
  initLanguage: string = 'vi'
): Promise<RoomIndexRes> => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${id}?include=details,district,city`, {
    headers: { 'Accept-Language': initLanguage }
  });

  return res.data.data;
};

export const getDataCalculate = async (
  query: BookingPriceCalculatorReq,
  initLanguage: string = 'vi'
): Promise<BookingPriceCalculatorRes> => {
  const res: AxiosRes<BookingPriceCalculatorRes> = await axios.post(
    'bookings/calculate-price-with-specific-day-price',
    query,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getDataBook = async (
  query: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<Omit<BookState, 'error' | 'dataInvoice'>> => {
  const body = {
    booking_type: parseInt(query.booking_type, 10),
    checkin: query.checkin,
    checkout: query.checkout,
    coupon: '',
    number_of_guests: parseInt(query.number_of_guests, 10),
    room_id: parseInt(query.room_id, 10)
  } as BookingPriceCalculatorReq;

  try {
    const res = await Promise.all([
      getRoomDetails(query.room_id, initLanguage),
      getDataCalculate(body, initLanguage)
    ]);

    const [room, dataCalculate] = res;

    dispatch({ type: 'setRoomBook', payload: room });
    dispatch({ type: 'setDataCalculate', payload: dataCalculate });
    dispatch({ type: 'setError', payload: false });

    return { room, dataCalculate };
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }

  // const res = Promise.all([])
};

export const createBooking = async (data: BookingCreateReq): Promise<BookingIndexRes> => {
  const res: AxiosRes<BookingIndexRes> = await axios.post('bookings', data);

  return res.data.data;
};

export const getInvoice = async (
  query: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<PaymentBankListRes> => {
  const { uuid } = query;

  const params = {
    include: 'room.details,room.media,room.city,room.district'
  };

  const queryString = qs.stringify(params);
  const url = `bank-list/${uuid}?${queryString}`;

  try {
    const res: AxiosRes<PaymentBankListRes> = await axios.get(url, {
      headers: { 'Accept-Language': initLanguage }
    });
    
    dispatch({ type: 'setInvoice', payload: res.data.data });
    dispatch({ type: 'setError', payload: false });
    return res.data.data;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

export const redirectToBaoKim = async (uuid: string, bank_id: number): Promise<string> => {
  const request = {
    payment_method: 4,
    bank_payment_method_id: bank_id
  };

  const res: AxiosRes<string> = await axios.post(`payment/${uuid}`, request);
  return res.data.data;
};
