import { updateObject } from '@/store/Context/utility';
import { ReducresActions } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { LTRoomAvailableRes } from '@/types/Requests/Rooms/RoomResponses';
import { axios } from '@/utils/axiosInstance';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import moment from 'moment';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, Reducer } from 'redux';

export type LTRoomReducerState = {
  readonly room: LTRoomIndexRes | null;
  readonly error: boolean;
  readonly availableDates: LTRoomAvailableRes;
  readonly roomSameBuilding: any[];
};

export type LTRoomReducerAction =
  | { type: 'setLTRoom'; payload: LTRoomIndexRes }
  | { type: 'setErrorSSRLTRoompage'; payload: boolean }
  | { type: 'setAvailableDates'; payload: LTRoomAvailableRes }
  | { type: 'setRoomSameBuilding'; payload: any[] };

export const init: LTRoomReducerState = {
  room: null,
  error: false,
  availableDates: null,
  roomSameBuilding: []
};

export const ltroomReducer: Reducer<LTRoomReducerState, LTRoomReducerAction> = (
  state: LTRoomReducerState = init,
  action: LTRoomReducerAction
): LTRoomReducerState => {
  switch (action.type) {
    case 'setLTRoom':
      return updateObject(state, { room: action.payload });
    case 'setErrorSSRLTRoompage':
      return updateObject(state, { error: action.payload });
    case 'setAvailableDates':
      return updateObject(state, { availableDates: action.payload });
    case 'setRoomSameBuilding':
      return updateObject(state, { roomSameBuilding: action.payload });
    default:
      return state;
  }
};

export const getLTRoom = async (
  idRoom: any,
  initLanguage: string = 'en'
): Promise<LTRoomIndexRes> => {
  const res: AxiosRes<LTRoomIndexRes> = await axios.get(
    `long-term-rooms/${idRoom}?include=city,district,merchant`,
    { headers: { 'Accept-Language': initLanguage } }
  );

  return res.data.data;
};

export const getRoomAvailableDate = async (
  idRoom: any,
  initLanguage: string = 'en',
  date_start: string = moment().format(DEFAULT_DATE_FORMAT)
): Promise<LTRoomAvailableRes> => {
  const res: AxiosRes<LTRoomAvailableRes> = await axios.get(
    `long-term-rooms/available-dates/${idRoom}`,
    {
      data: {
        move_in: date_start
      },
      headers: { 'Accept-Language': initLanguage }
    }
  );
  return res.data.data;
};
export const getRoomSameBuilding = async (
  buildingId: any
  // initLanguage: string = 'en'
): Promise<any> => {
  const res: AxiosRes<any> = await axios.get(`long-term-rooms?building_id=${buildingId}`);
  return res.data;
};

export const getDataLTRoom = async (
  dispatch: Dispatch<ReducresActions>,
  query: ParsedUrlQuery,
  initLanguage: string = 'en'
): Promise<Omit<any, 'error'>> => {
  const { id } = query;

  try {
    const res = await Promise.all([
      getLTRoom(id, initLanguage),
      getRoomAvailableDate(id, initLanguage)
    ]);

    const [room, availableDates] = res;
    // getRoomSameBuilding(room.apartment_building_id, initLanguage).then((res) =>
    //   dispatch({ type: 'setLTRoom', payload: res.data })
    // );

    dispatch({ type: 'setLTRoom', payload: room });
    dispatch({ type: 'setAvailableDates', payload: availableDates });
    dispatch({ type: 'setErrorSSRLTRoompage', payload: false });
    return { room, availableDates };
  } catch (error) {
    dispatch({ type: 'setErrorSSRLTRoompage', payload: true });
  }
};
