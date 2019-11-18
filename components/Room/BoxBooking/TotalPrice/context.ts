import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';
import { BookingPriceCalculatorReq } from '@/types/Requests/Booking/BookingRequests';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import { AxiosErrorCustom, AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import moment from 'moment';
import { Dispatch, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ReturnCalculate = {
  numberDay: number;
  checkData: boolean;
  loading: boolean;
  dataCalculate: BookingPriceCalculatorRes;
  error: string | null;
};

export const useCalculatePrice = (): ReturnCalculate => {
  const dispatchRedux = useDispatch<Dispatch<BookingAction>>();
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const endDate = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const guestsCount = useSelector<ReducersList, number>((state) => state.booking.numberOfGuest);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);
  const checkInHour = useSelector<ReducersList, string>((state) => state.booking.checkInHour);
  const checkOutHour = useSelector<ReducersList, string>((state) => state.booking.checkOutHour);
  const [loading, setLoading] = useState(false);
  const { router } = useContext(GlobalContext);
  const { dispatch, state } = useContext(RoomDetailsContext);
  const { dataCalculate, error } = state;

  const numberDay: number = useMemo<number>(() => {
    if (!!startDate && !!endDate) {
      if (startDate === endDate) {
        return 1;
      }
      const startValue = moment(startDate);
      const endValue = moment(endDate);

      return Math.abs(endValue.diff(startValue, 'days'));
    }

    return 0;
  }, [endDate, startDate]);

  const checkData = useMemo<boolean>(() => {
    return !!startDate && !!endDate && guestsCount !== 0;
  }, [endDate, startDate, guestsCount]);

  useEffect(() => {
    checkData && getcalculatePrice();
  }, [checkData, endDate, startDate, guestsCount, bookingType, checkInHour, checkOutHour]);

  const getcalculatePrice = async () => {
    setLoading(true);

    const body: BookingPriceCalculatorReq = {
      room_id: parseInt(router.query.id as string, 10),
      checkin:
        bookingType === 2
          ? moment(startDate)
              .set({ hour: 14, minute: 0, second: 0, millisecond: 0 })
              .format(DEFAULT_DATE_TIME_FORMAT)
          : `${startDate} ${checkInHour}`,
      checkout:
        bookingType === 2
          ? moment(endDate)
              .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
              .format(DEFAULT_DATE_TIME_FORMAT)
          : `${endDate} ${checkOutHour}`,
      coupon: '',
      number_of_guests: guestsCount,
      booking_type: bookingType
    };

    try {
      const res: AxiosRes<BookingPriceCalculatorRes> = await axios.post(
        'bookings/calculate-price-with-specific-day-price',
        body
      );

      setLoading(false);
      dispatch({ type: 'setDataCalculdate', payload: res.data.data });
      dispatch({ type: 'setError', payload: null });
      dispatchRedux({ type: 'SET_DATA_CALCULATE', payload: res.data.data });
    } catch (error) {
      const result: AxiosErrorCustom<{ errors: string; exception: string }> = error;

      setLoading(false);
      dispatch({ type: 'setError', payload: result.response.data.data.exception });
      dispatch({ type: 'setDataCalculdate', payload: null });
      dispatchRedux({ type: 'SET_DATA_CALCULATE', payload: null });
    }
  };

  return { numberDay, checkData, loading, dataCalculate, error };
};
