import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { axios } from '@/utils/axiosInstance';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import moment from 'moment';
import { Dispatch, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDataPriceByDay, DataChangePriceByDay } from '../DateRangeSingle/context';

export const useCheckBookingTypeHour = (): [boolean] => {
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const endDate = useSelector<ReducersList, string | null>((state) => state.booking.endDate);
  const bookingType = useSelector<ReducersList, number>((state) => state.booking.bookingType);

  const check = useMemo<boolean>(() => {
    return !!startDate && !!endDate && bookingType === 1;
  }, [startDate, endDate, bookingType]);

  return [check];
};

export const getAvailablecCheckout = async (
  date: string,
  id: any,
  dispatch: Dispatch<BookingAction>,
  checkOutHour: string
): Promise<string[]> => {
  const body = { checkin: date };
  try {
    const res: AxiosRes<string[]> = await axios.post(`rooms/available-checkout-time/${id}`, body);
    dispatch({ type: 'SET_AVAILABLE_CHECKOUT', payload: res.data.data });
    !checkOutHour && dispatch({ type: 'SET_CHECK_OUT_HOUR', payload: res.data.data[0] });
    return res.data.data;
  } catch (error) {
    // console.log(error.response);
  }
};

interface ReturnMinBookByHourCheckin {
  valueStart: string;
  startDate: string;
  available_hour: string[];
  dispatch: Dispatch<BookingAction>;
}

export const useMinBookByHourCheckin = (): ReturnMinBookByHourCheckin => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const startDate = useSelector<ReducersList, string | null>((state) => state.booking.startDate);
  const checkInHour = useSelector<ReducersList, string>((state) => state.booking.checkInHour);
  const checkOutHour = useSelector<ReducersList, string>((state) => state.booking.checkOutHour);
  const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
    (state) => state.roomPage.priceByDay
  );

  const { router } = useContext(GlobalContext);
  const dataPriceByDay = useMemo<DataChangePriceByDay>(() => changeDataPriceByDay(priceByDay), [
    priceByDay
  ]);

  const available_hour = useMemo<string[]>(() => {
    if (!!dataPriceByDay && !!startDate) {
      const currentDate = moment(startDate).format(DEFAULT_DATE_FORMAT);
      const data = dataPriceByDay[currentDate];

      if (data) {
        return data.available_hour;
      }

      return [];
    }
    return [];
  }, [startDate, dataPriceByDay]);

  useEffect(() => {
    if (available_hour.length > 0) {
      dispatch({ type: 'SET_CHECK_IN_HOUR', payload: available_hour[0] });
    }
  }, [available_hour]);

  const valueStart = useMemo<string>(() => {
    if (!!checkInHour) {
      return checkInHour;
    } else if (available_hour.length > 0) {
      return available_hour[0];
    }
    return '';
  }, [available_hour, checkInHour]);

  useEffect(() => {
    if (!!valueStart) {
      getAvailablecCheckout(
        `${moment(startDate).format(DEFAULT_DATE_FORMAT)} ${valueStart}`,
        router.query.id,
        dispatch,
        checkOutHour
      );
    }
  }, [valueStart, checkInHour]);

  return { valueStart, startDate, available_hour, dispatch };
};
