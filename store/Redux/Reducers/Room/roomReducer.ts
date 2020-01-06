import { RoomIndexRes, RoomScheduleRes } from '@/types/Requests/Rooms/RoomResponses';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import _ from 'lodash';
import { PriceByDayRes, BodyRequestPriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';
import moment from 'moment';
import qs from 'query-string';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { updateObject } from '@/store/Context/utility';
import { ReducresActions } from '..';
import { Reducer, Dispatch } from 'redux';
import { ParsedUrlQuery } from 'querystring';
import { GuidebookRes } from '@/types/Requests/Places/PlaceIndexResponse';
export type RoomReducerState = {
  readonly room: RoomIndexRes | null;
  readonly roomRecommend: RoomIndexRes[];
  readonly schedule: string[];
  readonly priceByDay: PriceByDayRes[];
  readonly guidebooks?: GuidebookRes[];
  readonly placesList: any;
  readonly error: boolean;
};

export type RoomReducerAction =
  | { type: 'setRoom'; payload: RoomIndexRes }
  | { type: 'setRoomRecommend'; payload: RoomIndexRes[] }
  | { type: 'setSchedule'; payload: string[] }
  | { type: 'setPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'addPriceByDay'; payload: PriceByDayRes[] }
  | { type: 'setGuideBooks'; payload: GuidebookRes[] }
  | { type: 'setPlaces'; payload: any }
  | { type: 'setErrorSSRRoompage'; payload: boolean };

export const init: RoomReducerState = {
  room: null,
  roomRecommend: [],
  schedule: [],
  priceByDay: [],
  guidebooks: [],
  placesList: null,
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
    case 'setGuideBooks':
      return updateObject(state, { guidebooks: action.payload });
    case 'setPlaces':
      return updateObject(state, { placesList: action.payload });
    case 'setErrorSSRRoompage':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getRoom = async (idRoom: any, initLanguage: string = 'en'): Promise<RoomIndexRes> => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(
    `rooms/${idRoom}?include=details,merchant,comforts.details,media,district,city,reviews.user,prices,places`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

const getRoomRecommend = async (
  idRoom: any,
  initLanguage: string = 'en'
): Promise<RoomIndexRes[]> => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms/room_recommend/${idRoom}?include=media,details,city,district`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getRoomSchedule = async (
  idRoom: any,
  initLanguage: string = 'en'
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
  initLanguage: string = 'en'
): Promise<PriceByDayRes[]> => {
  const query: BodyRequestPriceByDayRes = { date_start, date_end };

  const res: AxiosRes<PriceByDayRes[]> = await axios.get(
    `rooms/calendar-props/${idRoom}?${qs.stringify(query)}`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getGuideBookList = async (dispatch: Dispatch<RoomReducerAction>): Promise<any> => {
  const res: AxiosRes<any> = await axios.get(`guidebookcategories`);
  const guidebooks = res.data.data;
  dispatch({ type: 'setGuideBooks', payload: guidebooks });
  return guidebooks;
};

export const getDataRoom = async (
  dispatch: Dispatch<ReducresActions>,
  query: ParsedUrlQuery,
  initLanguage: string = 'en'
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
    const placesList = room.places.data;

    dispatch({ type: 'setRoom', payload: room });
    dispatch({ type: 'setRoomRecommend', payload: roomRecommend });
    dispatch({ type: 'setSchedule', payload: schedule });
    dispatch({ type: 'setPriceByDay', payload: priceByDay });
    dispatch({ type: 'setPlaces', payload: room.places.data });
    dispatch({ type: 'setErrorSSRRoompage', payload: false });

    return { room, schedule, priceByDay, roomRecommend, placesList };
  } catch (error) {
    dispatch({ type: 'setErrorSSRRoompage', payload: true });
  }
};
