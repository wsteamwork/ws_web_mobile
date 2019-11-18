import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import _ from 'lodash';
import { NextRouter } from 'next/router';
import { PriceByDayRes, BodyRequestPriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import moment from 'moment';
import qs from 'query-string';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { updateObject } from '@/store/Context/utility';
import { ReducresActions } from '..';
import { Reducer, Dispatch } from 'redux';
import { ParsedUrlQuery } from 'querystring';
// import Cookies from 'universal-cookie';
export type RoomReducerState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[];
  readonly schedule: string[];
  readonly priceByDay: PriceByDayRes[];
  readonly error: boolean;
};

export type RoomReducerAction =
  | { type: 'setRoom'; payload: RoomIndexRes }
  | { type: 'setRoomRecommend'; payload: RoomIndexRes[] }
  | { type: 'setSchedule'; payload: string[] }
  | { type: 'setPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'addPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'setErrorSSRRoompage'; payload: boolean };

export const init: RoomReducerState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  priceByDay: [],
  error: false
};

export const roomReducer: Reducer<RoomReducerState, RoomReducerAction> = (
  state: RoomReducerState = init,
  action: RoomReducerAction
): RoomReducerState => {
  switch (action.type) {
    case 'setRoom':
      return updateObject(state, { room: action.payload });
    case 'setRoomRecommend':
      return updateObject(state, { roomRecommend: action.payload });
    case 'setSchedule':
      return updateObject(state, { schedule: action.payload });
    case 'setPriceByDay':
      return updateObject(state, { priceByDay: action.payload });
    case 'addPriceByDay':
      return updateObject(state, { priceByDay: [...state.priceByDay, ...action.payload] });
    case 'setErrorSSRRoompage':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getRoom = async (idRoom: any, initLanguage: string = 'vi'): Promise<RoomIndexRes> => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(
    `rooms/${idRoom}?include=details,merchant,comforts.details,media,district,city,places.guidebook,reviews.user,prices`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

const getRoomRecommend = async (
  idRoom: any,
  initLanguage: string = 'vi'
): Promise<RoomIndexRes[]> => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms/room_recommend/${idRoom}?include=media,details,city,district`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getRoomSchedule = async (
  idRoom: any,
  initLanguage: string = 'vi'
): Promise<string[]> => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${idRoom}`, {
    headers: { 'Accept-Language': initLanguage }
  });
  return res.data.data.blocks;
};

export const getPriceByDay = async (
  idRoom: any,
  date_start: string = moment().format(DEFAULT_DATE_FORMAT),
  date_end: string = moment()
    .add(6, 'month')
    .endOf('month')
    .format(DEFAULT_DATE_FORMAT),
  initLanguage: string = 'vi'
): Promise<PriceByDayRes[]> => {
  const query: BodyRequestPriceByDayRes = { date_start, date_end };

  const res: AxiosRes<PriceByDayRes[]> = await axios.get(
    `rooms/calendar-props/${idRoom}?${qs.stringify(query)}`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getDataRoom = async (
  dispatch: Dispatch<ReducresActions>,
  query: ParsedUrlQuery,
  initLanguage: string = 'vi'
): Promise<Omit<RoomReducerState, 'error'>> => {
  const { id } = query;
  try {
    const res = await Promise.all([
      getRoom(id, initLanguage),
      getRoomRecommend(id, initLanguage),
      getRoomSchedule(id, initLanguage),
      getPriceByDay(id, undefined, undefined, initLanguage)
    ]);

    const [room, roomRecommend, schedule, priceByDay] = res;

    dispatch({ type: 'setRoom', payload: room });
    dispatch({ type: 'setRoomRecommend', payload: roomRecommend });
    dispatch({ type: 'setSchedule', payload: schedule });
    dispatch({ type: 'setPriceByDay', payload: priceByDay });
    dispatch({ type: 'setErrorSSRRoompage', payload: false });

    return { room, schedule, priceByDay, roomRecommend };
  } catch (error) {
    dispatch({ type: 'setErrorSSRRoompage', payload: true });
    // console.log(error.response);
  }
};
