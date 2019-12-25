import { updateObject } from '@/store/Context/utility';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { cleanAccents } from '@/utils/mixins';
import { Dispatch, Reducer } from 'redux';
import Cookies from 'universal-cookie';
import { Coordinate } from './CreateListing';
export type CreateApartmentState = {
  readonly name: string;
  readonly name_en: string;
  readonly address: string;
  readonly avatar: string;
  readonly district_id: number;
  readonly district_name: string;
  readonly city_id: number;
  readonly city_name: string;
  readonly coordinate: Coordinate;
  readonly disableSubmit: boolean;
  readonly error: boolean;
};

export type CreateApartmentActions =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_NAME_EN'; payload: string }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_DISTRICT'; payload: string }
  | { type: 'SET_COORDINATE'; payload: Coordinate }
  | { type: 'SET_DISABLE_SUBMIT'; payload: boolean }
  | { type: 'setError'; payload: boolean };

const init: CreateApartmentState = {
  name: '',
  name_en: '',
  address: '',
  avatar: '',
  city_id: null,
  city_name: '',
  district_id: null,
  district_name: '',
  coordinate: null,
  disableSubmit: true,
  error: false
};

export const createApartmentReducer: Reducer<CreateApartmentState, CreateApartmentActions> = (
  state: CreateApartmentState = init,
  action: CreateApartmentActions
): CreateApartmentState => {
  switch (action.type) {
    case 'SET_NAME':
      return updateObject<CreateApartmentState>(state, { name: action.payload });
    case 'SET_NAME_EN':
      return updateObject<CreateApartmentState>(state, { name_en: action.payload });
    case 'SET_ADDRESS':
      return updateObject<CreateApartmentState>(state, { address: action.payload });
    case 'SET_ADDRESS':
      return updateObject<CreateApartmentState>(state, { address: action.payload });
    case 'SET_AVATAR':
      return updateObject<CreateApartmentState>(state, { avatar: action.payload });
    case 'SET_CITY_ID':
      return updateObject<CreateApartmentState>(state, { city_id: action.payload });
    case 'SET_CITY':
      return updateObject<CreateApartmentState>(state, { city_name: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<CreateApartmentState>(state, { district_id: action.payload });
    case 'SET_DISTRICT':
      return updateObject<CreateApartmentState>(state, { district_name: action.payload });
    case 'SET_COORDINATE':
      return updateObject<CreateApartmentState>(state, { coordinate: action.payload });
    case 'SET_DISABLE_SUBMIT':
      return updateObject<CreateApartmentState>(state, { disableSubmit: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const handleCreateBuilding = async (data: any) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.post(
    `apartment-buildings`,
    {
      avatar: data.avatar,
      name: data.name,
      name_en: data.name_en,
      address: data.address,
      latitude: data.lat,
      longitude: data.lng,
      city_id: data.city_id,
      district_id: data.district_id
    },
    headers
  );

  return response.data;
};

export const handleUpdateBuilding = async (id: any, data: any) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.put(
    `apartment-buildings/${id}`,
    {
      avatar: data.avatar,
      name: data.name,
      name_en: data.name_en,
      address: data.address,
      latitude: data.lat,
      longitude: data.lng,
      city_id: data.city_id,
      district_id: data.district_id
    },
    headers
  );

  return response.data;
};

export const getDataBuilding = async (
  id: any,
  dispatch: Dispatch<CreateApartmentActions>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`apartment-buildings/${id}?include=city,district`);
    let building = res.data.data;
    dispatch({ type: 'SET_NAME', payload: building.name });
    dispatch({ type: 'SET_NAME_EN', payload: building.name_en });
    dispatch({ type: 'SET_ADDRESS', payload: building.address });
    dispatch({ type: 'SET_DISTRICT', payload: cleanAccents(building.district.data.name.trim()) });
    dispatch({ type: 'SET_DISTRICT_ID', payload: building.district.data.id });
    dispatch({ type: 'SET_CITY', payload: cleanAccents(building.city.data.name.trim()) });
    dispatch({ type: 'SET_CITY_ID', payload: building.city.data.id });
    dispatch({ type: 'SET_AVATAR', payload: building.avatar });
    dispatch({ type: 'SET_COORDINATE', payload: { lat: parseFloat(building.latitude), lng: parseFloat(building.longitude) } });
    return building;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};
