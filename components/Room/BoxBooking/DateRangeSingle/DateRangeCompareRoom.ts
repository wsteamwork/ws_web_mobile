import { getPriceByDay, getRoomSchedule } from '@/store/Redux/Reducers/Room/roomReducer';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

interface IScheduleCompare {
  isDayBlocked?: (day: Moment, status: 'room1' | 'room2') => boolean;
  isOutsideRange?: (day: Moment) => boolean;
  priceByDay1?: PriceByDayRes[];
  priceByDay2?: PriceByDayRes[];
}

export const useScheduleCompareRoom = (idRoom1: number, idRoom2: number): IScheduleCompare => {
  const [scheduleRoom1, setScheduleRoom1] = useState<string[]>([]);
  const [scheduleRoom2, setScheduleRoom2] = useState<string[]>([]);
  const [priceByDay1, setPriceByDay1] = useState<PriceByDayRes[]>([]);
  const [priceByDay2, setPriceByDay2] = useState<PriceByDayRes[]>([]);

  useEffect(() => {
    if (idRoom1 !== 0 && idRoom2 !== 0) {
      Promise.all([
        getRoomSchedule(idRoom1),
        getRoomSchedule(idRoom2),
        getPriceByDay(idRoom1),
        getPriceByDay(idRoom2)
      ])
        .then((res) => {
          setScheduleRoom1(res[0]);
          setScheduleRoom2(res[1]);
          setPriceByDay1(res[2]);
          setPriceByDay2(res[3]);
        })
        .catch((err) => {});
    } else {
    }
  }, [idRoom1, idRoom2]);

  const isDayBlocked = (day: Moment, status: 'room1' | 'room2') => {
    let isBlocked;

    if (status === 'room1') {
      isBlocked = _.indexOf(scheduleRoom1, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    } else {
      isBlocked = _.indexOf(scheduleRoom2, day.format(DEFAULT_DATE_FORMAT)) !== -1;
    }

    return isBlocked;
  };

  const isOutsideRange = (day: Moment) => day.diff(moment(), 'days') < 0;

  return {
    isDayBlocked,
    isOutsideRange,
    priceByDay1,
    priceByDay2
  };
};
