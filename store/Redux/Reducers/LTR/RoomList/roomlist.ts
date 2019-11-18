import { updateObject } from '@/store/Context/utility';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AxiosRes, Pagination } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import Router from 'next/router';
import qs from 'query-string';
import { Dispatch, Reducer } from 'redux';
export type RoomListReducerState = {
  readonly roomlist: LTRoomIndexRes[];
  readonly meta: Pagination | null;
  error: boolean;
};

export const init: RoomListReducerState = {
  roomlist: [],
  meta: null,
  error: false
};

export type RoomListReducerAction =
  | { type: 'setRoomList'; payload: LTRoomIndexRes[]; meta?: Pagination | null }
  | { type: 'setError'; payload: boolean };

export const roomListReducer: Reducer<RoomListReducerState, RoomListReducerAction> = (
  state: RoomListReducerState = init,
  action: RoomListReducerAction
): RoomListReducerState => {
  switch (action.type) {
    case 'setRoomList':
      return updateObject(state, { roomlist: action.payload, meta: action.meta });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getRoomList = async (
  dispatch: Dispatch<RoomListReducerAction>,
  initLanguage: string = 'vi',
  token?: string
): Promise<any> => {
  const headers = token && {
    headers: {
      'Accept-Language': initLanguage
    }
  };
  try {
    let params = Router.query;
    let query = {
      size: 10,
      page: params.page
    };
    const url = `long-term-rooms?${qs.stringify(query)}`;
    const res: AxiosRes<any> = await axios_merchant.get(url, headers);
    const roomlist = res.data.data;
    if (roomlist) {
      dispatch({ type: 'setRoomList', payload: roomlist, meta: res.data.meta });
    }
    return roomlist;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
