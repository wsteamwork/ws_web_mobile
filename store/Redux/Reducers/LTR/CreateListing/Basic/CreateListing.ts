import { updateObject } from '@/store/Context/utility';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { axios_merchant } from '@/utils/axiosInstance';
import _ from 'lodash';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, Reducer } from 'redux';
import { getLTRoom } from '../../LTRoom/ltroomReducer';
import Cookies from 'universal-cookie';

interface Coordinate {
  lat: number;
  lng: number;
}

export type CreateListingState = {
  readonly leaseType: number;
  readonly accommodationType: number;
  readonly totalArea: number;
  readonly stayWithHost: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
  readonly bedsNumber: number;
  readonly bathroomNumber: number;
  readonly bedRooms: BedRoomReq;
  readonly address: string;
  readonly building: string;
  readonly city_id: number;
  readonly district_id: number;
  readonly coordinate: Coordinate;
  readonly listing: LTRoomIndexRes;
  readonly id_listing: number;
  readonly disableSubmit: boolean;
  readonly errorBasic: boolean;
};

export type CreateListingActions =
  | { type: 'SET_LEASE_TYPE'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_TOTAL_AREA'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number }
  | { type: 'SET_BEDS_NUMBER'; payload: number }
  | { type: 'SET_BEDROOMS'; payload: BedRoomReq }
  | { type: 'SET_BATHROOM_NUMBER'; payload: number }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_BUILDING'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_COORDINATE'; payload: Coordinate }
  | { type: 'SET_LISTING'; payload: any }
  | { type: 'SET_ID_LISTING'; payload: number }
  | { type: 'SET_DISABLE_SUBMIT'; payload: boolean }
  | { type: 'SET_ERROR_BASIC'; payload: boolean };

const init: CreateListingState = {
  leaseType: 3,
  accommodationType: 2,
  totalArea: 0,
  stayWithHost: 0,
  bedRooms: null,
  bedsNumber: 1,
  guestRecommendation: 0,
  maxGuest: 0,
  bedRoomsNumber: 1,
  bathroomNumber: 1,
  address: '',
  building: '',
  city_id: null,
  district_id: null,
  coordinate: null,
  listing: null,
  id_listing: 0,
  disableSubmit: false,
  errorBasic: false
};

export const createListingReducer: Reducer<CreateListingState, CreateListingActions> = (
  state: CreateListingState = init,
  action: CreateListingActions
): CreateListingState => {
  switch (action.type) {
    case 'SET_LEASE_TYPE':
      return updateObject<CreateListingState>(state, { leaseType: action.payload });
    case 'SET_ACCOMMODATION_TYPE':
      return updateObject<CreateListingState>(state, { accommodationType: action.payload });
    case 'SET_TOTAL_AREA':
      return updateObject<CreateListingState>(state, { totalArea: action.payload });
    case 'SET_STAY_WITH_HOST':
      return updateObject<CreateListingState>(state, { stayWithHost: action.payload });
    case 'SET_GUEST_RECOMMENDATION':
      return updateObject<CreateListingState>(state, { guestRecommendation: action.payload });
    case 'SET_MAX_GUEST':
      return updateObject<CreateListingState>(state, { maxGuest: action.payload });
    case 'SET_BEDROOMS_NUMBER':
      return updateObject<CreateListingState>(state, { bedRoomsNumber: action.payload });
    case 'SET_BEDS_NUMBER':
      return updateObject<CreateListingState>(state, { bedsNumber: action.payload });
    case 'SET_BEDROOMS':
      return updateObject<CreateListingState>(state, { bedRooms: action.payload });
    case 'SET_BATHROOM_NUMBER':
      return updateObject<CreateListingState>(state, { bathroomNumber: action.payload });
    case 'SET_ADDRESS':
      return updateObject<CreateListingState>(state, { address: action.payload });
    case 'SET_BUILDING':
      return updateObject<CreateListingState>(state, { building: action.payload });
    case 'SET_CITY_ID':
      return updateObject<CreateListingState>(state, { city_id: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<CreateListingState>(state, { district_id: action.payload });
    case 'SET_COORDINATE':
      return updateObject<CreateListingState>(state, { coordinate: action.payload });
    case 'SET_LISTING':
      return updateObject<CreateListingState>(state, { listing: action.payload });
    case 'SET_ID_LISTING':
      return updateObject<CreateListingState>(state, { id_listing: action.payload });
    case 'SET_DISABLE_SUBMIT':
      return updateObject<CreateListingState>(state, { disableSubmit: action.payload });
    case 'SET_ERROR_BASIC':
      return updateObject<CreateListingState>(state, { errorBasic: action.payload });

    default:
      return state;
  }
};

// const submitStepOne = async (data: any, dispatch: Dispatch<CreateListingActions>) => {
//   dispatch({ type: 'SET_LEASE_TYPE', payload: data });
//   dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: data });
//   dispatch({ type: 'SET_STAY_WITH_HOST', payload: data });
// };

export const handleCreateRoom = async (
  data: any,
  dispatch: any,
  uid?: any,
  initLanguage: string = 'en'
) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };
  // console.log(data);
  const body = {
    step1: {
      tab1: {
        lease_type: data.lease_type,
        accommodation_type: data.accommodation_type,
        stay_with_host: data.stay_with_host,
        total_area: data.total_area
      },
      tab2: {
        guest: {
          recommendation: data.guest_recommendation,
          max_additional_guest: data.max_guest
        },
        bedrooms: data.bedRooms
      },
      tab3: {
        bathrooms: {
          number_bathroom: data.number_bathroom
        }
      },
      tab4: {
        address: data.address,
        building: data.building,
        city_id: data.city_id,
        district_id: data.district_id,
        latitude: parseFloat(data.coordinate.lat),
        longitude: parseFloat(data.coordinate.lng)
      }
    }
  };
  const url = uid && uid !== null ? `long-term/room/create?uid=${uid}` : 'long-term/room/create';
  try {
    const response = await axios_merchant.post(url, body, headers);

    dispatch({
      type: 'SET_LISTING',
      payload: response.data.data
    });
    return response;
  } catch (error) {
    return false;
  }
};

export const handleUpdateStep1 = async (
  data: any,
  dispatch: any,
  uid: any,
  initLanguage: string = 'en'
) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };
  // console.log(data);
  const body = {
    step1: {
      tab1: {
        lease_type: data.lease_type,
        accommodation_type: data.accommodation_type,
        stay_with_host: data.stay_with_host,
        total_area: data.total_area
      },
      tab2: {
        guest: {
          recommendation: data.guest_recommendation,
          max_additional_guest: data.max_guest
        },
        bedrooms: data.bedRooms
      },
      tab3: {
        bathrooms: {
          number_bathroom: data.number_bathroom
        }
      },
      tab4: {
        address: data.address,
        building: data.building,
        city_id: data.city_id,
        district_id: data.district_id,
        latitude: parseFloat(data.coordinate.lat),
        longitude: parseFloat(data.coordinate.lng)
      }
    }
  };

  const response = await axios_merchant.post(`long-term/room/step1/${uid}`, body, headers);

  dispatch({
    type: 'SET_LISTING',
    payload: response.data.data
  });

  return response;
};

export const countBedsNumberFromBedRoomList = (bedRoomsList: BedRoomReq) => {
  let totalBedsNumberInList = 0;

  _.times(bedRoomsList.number_bedroom, (i) => {
    totalBedsNumberInList += bedRoomsList[`bedroom_${i + 1}`].number_bed;
  });
  return totalBedsNumberInList;
};

export const getDataLTCreateListingID = async (
  dispatch: Dispatch<CreateListingActions>,
  query: ParsedUrlQuery,
  initLanguage: string = 'en'
): Promise<any> => {
  const { id } = query;
  try {
    const res = await getLTRoom(id, initLanguage);
    // console.log(res);
    dispatch({ type: 'SET_LISTING', payload: res });
    dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: res.accommodation_type });
    dispatch({ type: 'SET_TOTAL_AREA', payload: res.total_area });
    dispatch({ type: 'SET_STAY_WITH_HOST', payload: res.stay_with_host });
    dispatch({ type: 'SET_GUEST_RECOMMENDATION', payload: res.guests.recommendation });
    dispatch({ type: 'SET_MAX_GUEST', payload: res.guests.max_additional_guest });
    dispatch({ type: 'SET_BEDROOMS_NUMBER', payload: res.bedrooms.number_bedroom });
    dispatch({ type: 'SET_BEDS_NUMBER', payload: countBedsNumberFromBedRoomList(res.bedrooms) });
    dispatch({ type: 'SET_BEDROOMS', payload: res.bedrooms });
    dispatch({ type: 'SET_BATHROOM_NUMBER', payload: res.bathrooms.number_bathroom });
    dispatch({ type: 'SET_ADDRESS', payload: res.address });

    dispatch({ type: 'SET_BUILDING', payload: res.building });
    dispatch({ type: 'SET_CITY_ID', payload: res.city_id });
    dispatch({ type: 'SET_DISTRICT_ID', payload: res.district_id });
    dispatch({
      type: 'SET_COORDINATE',
      payload: { lat: parseFloat(res.latitude), lng: parseFloat(res.longitude) }
    });

    dispatch({ type: 'SET_ERROR_BASIC', payload: false });
    return res;
  } catch (error) {
    dispatch({ type: 'SET_ERROR_BASIC', payload: true });
  }
};
