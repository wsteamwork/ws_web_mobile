import { updateObject } from '@/store/Context/utility';
import { ComfortIndexGetParams } from '@/types/Requests/Comforts/ComfortRequests';
import { ComfortIndexRes } from '@/types/Requests/Comforts/ComfortResponses';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AxiosRes, BaseResponse, Pagination, TypeSelect } from '@/types/Requests/ResponseTemplate';
import {
  LTRoomIndexGetParams,
  LTRoomUrlParams,
  MapCoords,
  RoomIndexGetParams,
  RoomUrlParams
} from '@/types/Requests/Rooms/RoomRequests';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import _ from 'lodash';
import { BaseRouter } from 'next-server/dist/lib/router/router';
import { NextRouter } from 'next/router';
import qs from 'query-string';
import { createContext, Dispatch, Reducer } from 'react';

export const MIN_PRICE = 0;
export const MAX_PRICE = 50000000;
export const STEP_PRICE = 100000;

export const RoomIndexContext = createContext<IRoomIndexContext>(null as IRoomIndexContext);

export interface IRoomIndexContext {
  state: RoomIndexState;
  dispatch: Dispatch<RoomIndexAction>;
}

export type RoomIndexAction =
  | { type: 'setRooms'; rooms: RoomIndexRes[]; meta?: Pagination | null }
  | { type: 'setlongtermRooms'; longtermRooms: LTRoomIndexRes[]; meta?: Pagination | null }
  | { type: 'setMeta'; meta: Pagination }
  | { type: 'setLoading'; isLoading: boolean }
  | { type: 'setMapOpen'; isMapOpen: boolean }
  | { type: 'setCoords'; payload: MapCoords | null };

export type RoomIndexState = {
  readonly rooms: RoomIndexRes[];
  readonly longtermRooms: LTRoomIndexRes[];
  readonly meta: Pagination | null;
  readonly isLoading: boolean;
  readonly isMapOpen: boolean;
  readonly coords: MapCoords | null;
};

export const RoomIndexStateInit: RoomIndexState = {
  rooms: [],
  longtermRooms: [],
  meta: null,
  isLoading: false,
  isMapOpen: false,
  coords: null
};

export const RoomIndexReducer: Reducer<RoomIndexState, RoomIndexAction> = (
  state: RoomIndexState,
  action: RoomIndexAction
): RoomIndexState => {
  switch (action.type) {
    case 'setRooms':
      return updateObject<RoomIndexState>(state, {
        rooms: action.rooms,
        meta: action.meta || null
      });
    case 'setlongtermRooms':
      return updateObject<RoomIndexState>(state, {
        longtermRooms: action.longtermRooms,
        meta: action.meta
      });
    case 'setMeta':
      return updateObject<RoomIndexState>(state, { meta: action.meta });
    case 'setLoading':
      return updateObject<RoomIndexState>(state, { isLoading: action.isLoading });
    case 'setMapOpen':
      return updateObject<RoomIndexState>(state, { isMapOpen: action.isMapOpen });
    case 'setCoords':
      return updateObject<RoomIndexState>(state, { coords: action.payload });
    default:
      return state;
  }
};

export const getRooms = async (
  router: NextRouter,
  coords?: MapCoords
): Promise<BaseResponse<RoomIndexRes[]>> => {
  let params: RoomUrlParams = router.query;

  let query: Partial<RoomIndexGetParams> = {
    include: 'city,district',
    name: params.name,
    city_id: params.city_id,
    district_id: params.district_id,
    rent_type: params.rent_type,
    check_in: params.check_in,
    check_out: params.check_out,
    number_guest: params.number_of_guests,
    most_popular: params.most_popular,
    sort_total_review: params.sort_total_review === null ? 1 : undefined,
    discount: params.discount === null ? 1 : undefined,
    price_day_from: params.price_day_from,
    price_day_to: params.price_day_to,
    instant_book: params.instant_book,
    standard_point: params.rating ? _.split(params.rating, ',')[0] : undefined,
    comfort_lists: !!params.amenities ? params.amenities : undefined,
    type_room: !!params.type_room ? params.type_room : undefined,
    page: params.page
  };

  if (coords) {
    query = updateObject(query, coords);
  }

  const signature = coords ? 'rooms/room-lat-long' : 'rooms';
  const url = `${signature}?${qs.stringify(query)}`;
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);

  return res.data;
};

export const newRoomLocation = (params: RoomUrlParams): Partial<BaseRouter> => {
  return {
    pathname: `/rooms`,
    asPath: `/rooms?${qs.stringify(params)}`
  };
};

export const fetchComforts = async () => {
  const params: ComfortIndexGetParams = {
    include: '',
    limit: -1
  };

  const url = 'rooms/count-room-by-comfort-lists';
  const res: AxiosRes<ComfortIndexRes[]> = await axios.get(url);
  return res.data;
};

export const fetchRoomType = async () => {
  const res: AxiosResponse<TypeSelect[]> = await axios.get('rooms/type');
  return res.data;
};

// Long term

export const getLTRooms = async (
  router: NextRouter,
  coords?: MapCoords
): Promise<BaseResponse<LTRoomIndexRes[]>> => {
  let params: LTRoomUrlParams = router.query;

  let query: Partial<LTRoomIndexGetParams> = {
    // include: 'city,district,merchant',
    name: params.name,
    city_id: params.city_id,
    district_id: params.district_id,
    bedrooms: params.bedrooms,
    number_guest: params.number_guest,
    min_price: params.min_price,
    max_price: params.max_price,
    accommodation_type: params.accommodation_type,
    comfort_lists: !!params.comfort_lists ? params.comfort_lists : undefined,
    discount: params.discount === null ? 1 : undefined, // 0,1
    instant_book: params.instant_book, // 1,2
    page: params.page,
  };

  if (coords) {
    query = updateObject(query, coords);
  }
  const signature = 'long-term-rooms';
  const url = `${signature}?${qs.stringify(query)}&limit=12`; // 12 item on 1 Page
  const res: AxiosRes<LTRoomIndexRes[]> = await axios.get(url);
  return res.data;
};
