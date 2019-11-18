import { Moment } from 'moment';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';

export type DateRange = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export type BookingState = {
  readonly numberOfGuest: number;
  readonly bookingType: number;
  readonly startDate: string | null;
  readonly endDate: string | null;
  readonly checkInHour: string | null;
  readonly checkOutHour: string | null;
  readonly availableCheckoutTime: string[];
  readonly dataCalculate: BookingPriceCalculatorRes | null;
};

export type BookingAction =
  | { type: 'SET_CHECK_IN'; payload: string }
  | { type: 'SET_CHECK_OUT'; payload: string }
  | { type: 'SET_CHECK_IN_HOUR'; payload: string }
  | { type: 'SET_CHECK_OUT_HOUR'; payload: string }
  | { type: 'SET_TYPE_BOOKING'; payload: number }
  | { type: 'SET_NUMBER_OF_GUEST'; payload: number }
  | { type: 'SET_AVAILABLE_CHECKOUT'; payload: string[] }
  | { type: 'SET_DATA_CALCULATE'; payload: BookingPriceCalculatorRes };

const init: BookingState = {
  numberOfGuest: 1,
  bookingType: 2,
  startDate: moment().format(DEFAULT_DATE_FORMAT),
  endDate: null,
  checkInHour: null,
  checkOutHour: null,
  availableCheckoutTime: [],
  dataCalculate: null
};

const reuderBooking: Reducer<BookingState, BookingAction> = (
  state: BookingState = init,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case 'SET_TYPE_BOOKING':
      return updateObject(state, { bookingType: action.payload });
    case 'SET_CHECK_IN':
      return updateObject(state, { startDate: action.payload });
    case 'SET_CHECK_OUT':
      return updateObject(state, { endDate: action.payload });
    case 'SET_CHECK_IN_HOUR':
      return updateObject(state, { checkInHour: action.payload });
    case 'SET_CHECK_OUT_HOUR':
      return updateObject(state, { checkOutHour: action.payload });
    case 'SET_NUMBER_OF_GUEST':
      return updateObject(state, { numberOfGuest: action.payload });
    case 'SET_AVAILABLE_CHECKOUT':
      return updateObject(state, { availableCheckoutTime: action.payload });
    case 'SET_DATA_CALCULATE':
      return updateObject(state, { dataCalculate: action.payload });
    default:
      return state;
  }
};

export default reuderBooking;
