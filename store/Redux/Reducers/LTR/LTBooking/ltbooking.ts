import { updateObject } from '@/store/Context/utility';
import {
  LTBookingCreateReq,
  LTBookingPriceCalculatorReq
} from '@/types/Requests/Booking/BookingRequests';
import {
  LTBookingIndexRes,
  LTBookingPriceCalculatorRes
} from '@/types/Requests/Booking/BookingResponses';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import moment from 'moment';
import qs from 'query-string';
import { Dispatch, Reducer } from 'react';
import { ReducresActions } from '../..';

export type LTBookingReducerState = {
  readonly movein: string | null;
  readonly moveout: string | null;
  readonly numberOfGuests: number;
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes;
  readonly LTDataInvoice: PaymentBankListRes;
  readonly LTPaymentError: boolean;
};

export type LTBookState = {
  readonly LTBookingPriceCalculate: LTBookingPriceCalculatorRes;
};

export type LTBookingAction =
  | { type: 'setMoveIn'; payload: string }
  | { type: 'setMoveOut'; payload: string }
  | { type: 'setNumberOfGuests'; payload: number }
  | { type: 'setLTBookingPriceCalculate'; payload: LTBookingPriceCalculatorRes }
  | { type: 'setLTDataInvoice'; payload: PaymentBankListRes }
  | { type: 'setLTPaymentError'; payload: boolean };

export const init: LTBookingReducerState = {
  movein: moment().format(DEFAULT_DATE_FORMAT),
  moveout: '',
  numberOfGuests: 1,
  LTBookingPriceCalculate: null,
  LTDataInvoice: null,
  LTPaymentError: false
};

export const ltBookingReducer: Reducer<LTBookingReducerState, LTBookingAction> = (
  state: LTBookingReducerState = init,
  action: LTBookingAction
): LTBookingReducerState => {
  switch (action.type) {
    case 'setMoveIn':
      return updateObject(state, { movein: action.payload });
    case 'setMoveOut':
      return updateObject(state, { moveout: action.payload });
    case 'setNumberOfGuests':
      return updateObject(state, { numberOfGuests: action.payload });
    case 'setLTBookingPriceCalculate':
      return updateObject(state, { LTBookingPriceCalculate: action.payload });
    case 'setLTDataInvoice':
      return updateObject(state, { LTDataInvoice: action.payload });
    case 'setLTPaymentError':
      return updateObject(state, { LTPaymentError: action.payload });
    default:
      return state;
  }
};

export const getLTCalculatedBookingPrice = async (
  body: LTBookingPriceCalculatorReq
): Promise<LTBookingPriceCalculatorRes> => {
  const { move_in, move_out, long_term_room_id } = body;
  const req: LTBookingPriceCalculatorReq = {
    long_term_room_id: long_term_room_id,
    move_in,
    move_out
  };

  const res: AxiosRes<LTBookingPriceCalculatorRes> = await axios.post(
    `long-term-bookings/price-calculator`,
    req
  );

  return res.data.data;
};

export const getLTBookingData = async (
  query: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<Omit<LTBookState, 'error'>> => {
  const { room_id } = query;
  const body = {
    move_in: query.move_in,
    move_out: query.move_out,
    long_term_room_id: parseInt(query.long_term_room_id, 10)
  } as LTBookingPriceCalculatorReq;

  try {
    const res = await Promise.all([
      // getLTRoom(room_id, initLanguage),
      getLTCalculatedBookingPrice(body)
    ]);

    const [LTBookingPriceCalculate] = res;

    dispatch({ type: 'setLTBookingPriceCalculate', payload: LTBookingPriceCalculate });
    dispatch({ type: 'setLTPaymentError', payload: false });

    return { LTBookingPriceCalculate };
  } catch (error) {
    dispatch({ type: 'setLTPaymentError', payload: true });
  }
};

export const createLTBooking = async (req: LTBookingCreateReq): Promise<LTBookingIndexRes> => {
  const res: AxiosRes<LTBookingIndexRes> = await axios.post(
    'long-term-bookings?include=contracts',
    req
  );
  // console.log(res.data.data);
  return res.data.data;
};

export const getLTInvoice = async (
  query: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<PaymentBankListRes> => {
  const { uuid } = query;

  const params = {
    include: 'contracts,longTermRoom,longTermRoom.city,longTermRoom.district'
  };

  const queryString = qs.stringify(params);
  const url = `long-term-booking-bank-list/${uuid}?${queryString}`;

  try {
    const res: AxiosRes<PaymentBankListRes> = await axios.get(url, {
      headers: { 'Accept-Language': initLanguage }
    });

    dispatch({ type: 'setLTDataInvoice', payload: res.data.data });
    dispatch({ type: 'setLTPaymentError', payload: false });
    return res.data.data;
  } catch (error) {
    dispatch({ type: 'setLTPaymentError', payload: true });
  }
};

export const LTredirectToBaoKim = async (uuid: string, bank_id: number): Promise<string> => {
  const request = {
    payment_method: 4,
    bank_payment_method_id: bank_id
  };

  const res: AxiosRes<string> = await axios.post(`long-term-booking-payment/${uuid}`, request);
  return res.data.data;
};
