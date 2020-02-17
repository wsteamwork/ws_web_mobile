import { BuildingListRes } from '@/types/Requests/Building/Building';
import {
  BuildingRequestParams,
  BuildingURLParams,
  MapCoords
} from '@/types/Requests/Building/BuildingRequest';
import { AxiosRes, BaseResponse, Pagination } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { NextRouter } from 'next/router';
import qs from 'query-string';
import { createContext, Dispatch, Reducer } from 'react';
import Cookies from 'universal-cookie';
import { updateObject } from '../utility';

const cookies = new Cookies();
const lang = cookies.get('initLanguage');

export const MIN_PRICE = 0;
export const MAX_PRICE = lang && lang == 'vi' ? 50000000 : 5000;
export const STEP_PRICE = lang && lang == 'vi' ? 100000 : 100;

export const BuildingIndexContext = createContext<IBuildingIndexContext>(
  null as IBuildingIndexContext
);

export interface IBuildingIndexContext {
  state: BuildingIndexState;
  dispatch: Dispatch<BuildingIndexAction>;
}

export type BuildingIndexAction =
  | { type: 'setBuildings'; buildings: BuildingListRes[]; meta?: Pagination | null }
  | { type: 'setMeta'; meta: Pagination }
  | { type: 'setLoading'; isLoading: boolean }
  | { type: 'setMapOpen'; isMapOpen: boolean }
  | { type: 'setServiceApartment'; isServiceApartment: boolean }
  | { type: 'setCoords'; payload: MapCoords | null };

export type BuildingIndexState = {
  readonly buildings: BuildingListRes[];
  readonly meta: Pagination | null;
  readonly isLoading: boolean;
  readonly isMapOpen: boolean;
  readonly isServiceApartment: boolean;
  readonly coords: MapCoords | null;
};

export const BuildingIndexStateInit: BuildingIndexState = {
  buildings: [],
  meta: null,
  isLoading: false,
  isMapOpen: false,
  isServiceApartment: false,
  coords: null
};

export const RoomIndexReducer: Reducer<BuildingIndexState, BuildingIndexAction> = (
  state: BuildingIndexState,
  action: BuildingIndexAction
): BuildingIndexState => {
  switch (action.type) {
    case 'setBuildings':
      return updateObject<BuildingIndexState>(state, {
        buildings: action.buildings,
        meta: action.meta
      });
    case 'setMeta':
      return updateObject<BuildingIndexState>(state, { meta: action.meta });
    case 'setLoading':
      return updateObject<BuildingIndexState>(state, { isLoading: action.isLoading });
    case 'setMapOpen':
      return updateObject<BuildingIndexState>(state, { isMapOpen: action.isMapOpen });
    case 'setServiceApartment':
      return updateObject<BuildingIndexState>(state, {
        isServiceApartment: action.isServiceApartment
      });
    case 'setCoords':
      return updateObject<BuildingIndexState>(state, { coords: action.payload });
    default:
      return state;
  }
};

// Long term
export const getBuildings = async (
  router: NextRouter,
  coords?: MapCoords
): Promise<BaseResponse<BuildingListRes[]>> => {
  let params: BuildingURLParams = router.query;
  const cookies = new Cookies();

  let query: Partial<BuildingRequestParams> = {
    include: 'city,district,merchant',
    name: params.name,
    city_id: params.city_id,
    district_id: params.district_id,
    bedrooms: params.bedrooms,
    number_guest: params.number_guest,
    min_price: params.min_price,
    max_price: params.max_price,
    page: params.page
  };

  if (coords) {
    query = updateObject(query, coords);
  }
  const initLanguage = cookies.get('initLanguage') || 'en';
  const signature = 'apartment-buildings';
  const url = `${signature}?${qs.stringify(query)}&limit=12`; // 12 item on 1 Page
  const res: AxiosRes<BuildingListRes[]> = await axios.get(url, {
    headers: { 'Accept-Language': initLanguage }
  });
  return res.data;
};
