import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import Cookies from 'universal-cookie';
import { AxiosRes } from './../../../../../types/Requests/ResponseTemplate';
import { updateObject } from '@/store/Context/utility';
import { Dispatch, Reducer } from 'redux';
import { axios_merchant } from '@/utils/axiosInstance';
import { guidebookRes } from '@/types/Requests/LTR/LTRoom/LTRoom';

interface Coordinate {
  lat: number;
  lng: number;
}

export type UpdateDetailsState = {
  readonly room_id: number;
  readonly accommodationType: number;
  readonly total_area: number;
  readonly number_of_listing: number;
  readonly stayWithHost: number;
  readonly status_short_term: number;
  readonly status_long_term: number;
  readonly guestRecommendation: number;
  readonly maxGuest: number;
  readonly bedRoomsNumber: number;
  readonly bathRooms: any;
  readonly bedRooms: BedRoomReq;
  readonly address: string;
  readonly building: string;
  readonly city_id: number;
  readonly district_id: number;
  readonly city_name: string;
  readonly district_name: string;
  readonly instant_book: number;
  readonly no_booking_cancel: number;
  readonly coordinate: Coordinate;
  readonly disableSubmit: boolean;
  readonly rent_type: number;
  readonly checkin: string;
  readonly checkout: string;
  readonly placesList: any;
  readonly guidebooks: guidebookRes[];
  readonly error: boolean;
};

export type UpdateDetailsActions =
  | { type: 'SET_ROOM_ID'; payload: number }
  | { type: 'SET_ACCOMMODATION_TYPE'; payload: number }
  | { type: 'SET_TOTAL_AREA'; payload: number }
  | { type: 'SET_NUMBER_OF_LISTING'; payload: number }
  | { type: 'SET_STAY_WITH_HOST'; payload: number }
  | { type: 'SET_STATUS_SHORT_TERM'; payload: number }
  | { type: 'SET_STATUS_LONG_TERM'; payload: number }
  | { type: 'SET_GUEST_RECOMMENDATION'; payload: number }
  | { type: 'SET_MAX_GUEST'; payload: number }
  | { type: 'SET_BEDROOMS_NUMBER'; payload: number }
  | { type: 'SET_BEDROOMS'; payload: BedRoomReq }
  | { type: 'SET_BATHROOMS'; payload: any }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_BUILDING'; payload: string }
  | { type: 'SET_CITY_ID'; payload: number }
  | { type: 'SET_DISTRICT_ID'; payload: number }
  | { type: 'SET_CITY_NAME'; payload: string }
  | { type: 'SET_DISTRICT_NAME'; payload: string }
  | { type: 'SET_COORDINATE'; payload: Coordinate }
  | { type: 'SET_DISABLE_SUBMIT'; payload: boolean }
  | { type: 'SET_INSTANT_BOOK'; payload: number }
  | { type: 'SET_BOOKING_CANCEL'; payload: number }
  | { type: 'SET_RENT_TYPE'; payload: number }
  | { type: 'SET_CHECKIN'; payload: string }
  | { type: 'SET_CHECKOUT'; payload: string }
  | { type: 'SET_PLACES'; payload: any }
  | { type: 'SET_GUIDEBOOKS'; payload: guidebookRes[] }
  | { type: 'SET_ERROR'; payload: boolean };

const init: UpdateDetailsState = {
  room_id: null,
  accommodationType: 2,
  total_area: 0,
  number_of_listing: 0,
  stayWithHost: 0,
  status_short_term: 0,
  status_long_term: 0,
  guestRecommendation: 0,
  maxGuest: 0,
  bedRooms: null,
  bedRoomsNumber: 1,
  bathRooms: null,
  address: '',
  building: '',
  city_id: null,
  district_id: null,
  city_name: '',
  district_name: '',
  coordinate: null,
  disableSubmit: false,
  instant_book: 0,
  no_booking_cancel: 0,
  rent_type: 1,
  checkin: '14:00:00',
  checkout: '12:00:00',
  placesList: null,
  guidebooks: [],
  error: false
};

export const updateDetailsReducer: Reducer<UpdateDetailsState, UpdateDetailsActions> = (
  state: UpdateDetailsState = init,
  action: UpdateDetailsActions
): UpdateDetailsState => {
  switch (action.type) {
    case 'SET_ROOM_ID':
      return updateObject<UpdateDetailsState>(state, { room_id: action.payload });
    case 'SET_ACCOMMODATION_TYPE':
      return updateObject<UpdateDetailsState>(state, { accommodationType: action.payload });
    case 'SET_TOTAL_AREA':
      return updateObject<UpdateDetailsState>(state, { total_area: action.payload });
    case 'SET_NUMBER_OF_LISTING':
      return updateObject<UpdateDetailsState>(state, { number_of_listing: action.payload });
    case 'SET_STAY_WITH_HOST':
      return updateObject<UpdateDetailsState>(state, { stayWithHost: action.payload });
    case 'SET_STATUS_SHORT_TERM':
      return updateObject<UpdateDetailsState>(state, { status_short_term: action.payload });
    case 'SET_STATUS_LONG_TERM':
      return updateObject<UpdateDetailsState>(state, { status_long_term: action.payload });
    case 'SET_GUEST_RECOMMENDATION':
      return updateObject<UpdateDetailsState>(state, { guestRecommendation: action.payload });
    case 'SET_MAX_GUEST':
      return updateObject<UpdateDetailsState>(state, { maxGuest: action.payload });
    case 'SET_BEDROOMS_NUMBER':
      return updateObject<UpdateDetailsState>(state, { bedRoomsNumber: action.payload });
    case 'SET_BEDROOMS':
      return updateObject<UpdateDetailsState>(state, { bedRooms: action.payload });
    case 'SET_BATHROOMS':
      return updateObject<UpdateDetailsState>(state, { bathRooms: action.payload });
    case 'SET_ADDRESS':
      return updateObject<UpdateDetailsState>(state, { address: action.payload });
    case 'SET_BUILDING':
      return updateObject<UpdateDetailsState>(state, { building: action.payload });
    case 'SET_CITY_ID':
      return updateObject<UpdateDetailsState>(state, { city_id: action.payload });
    case 'SET_DISTRICT_ID':
      return updateObject<UpdateDetailsState>(state, { district_id: action.payload });
    case 'SET_CITY_NAME':
      return updateObject<UpdateDetailsState>(state, { city_name: action.payload });
    case 'SET_DISTRICT_NAME':
      return updateObject<UpdateDetailsState>(state, { district_name: action.payload });
    case 'SET_COORDINATE':
      return updateObject<UpdateDetailsState>(state, { coordinate: action.payload });
    case 'SET_DISABLE_SUBMIT':
      return updateObject<UpdateDetailsState>(state, { disableSubmit: action.payload });
    case 'SET_INSTANT_BOOK':
      return updateObject<UpdateDetailsState>(state, { instant_book: action.payload });
    case 'SET_BOOKING_CANCEL':
      return updateObject<UpdateDetailsState>(state, { no_booking_cancel: action.payload });
    case 'SET_RENT_TYPE':
      return updateObject<UpdateDetailsState>(state, { rent_type: action.payload });
    case 'SET_CHECKIN':
      return updateObject<UpdateDetailsState>(state, { checkin: action.payload });
    case 'SET_CHECKOUT':
      return updateObject<UpdateDetailsState>(state, { checkout: action.payload });
    case 'SET_PLACES':
      return updateObject<UpdateDetailsState>(state, { placesList: action.payload });
    case 'SET_GUIDEBOOKS':
      return updateObject<UpdateDetailsState>(state, { guidebooks: action.payload });
    case 'SET_ERROR':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getDataUpdateListing = async (
  id: any,
  dispatch: Dispatch<UpdateDetailsActions>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    const listing = res.data.data;
    const room_id = listing.room_id;

    dispatch({ type: 'SET_ROOM_ID', payload: room_id });
    dispatch({ type: 'SET_ACCOMMODATION_TYPE', payload: listing.accommodation_type });
    dispatch({ type: 'SET_TOTAL_AREA', payload: listing.total_area });
    dispatch({ type: 'SET_NUMBER_OF_LISTING', payload: listing.number_of_listing });
    dispatch({ type: 'SET_STAY_WITH_HOST', payload: listing.stay_with_host });
    dispatch({ type: 'SET_STATUS_SHORT_TERM', payload: listing.short_term_room.merchant_status });
    dispatch({ type: 'SET_STATUS_LONG_TERM', payload: listing.merchant_status });
    dispatch({ type: 'SET_GUEST_RECOMMENDATION', payload: listing.guests.recommendation });
    dispatch({ type: 'SET_MAX_GUEST', payload: listing.guests.max_additional_guest });
    dispatch({ type: 'SET_BEDROOMS_NUMBER', payload: listing.bedrooms.number_bedroom });
    dispatch({ type: 'SET_BEDROOMS', payload: listing.bedrooms });
    dispatch({ type: 'SET_BATHROOMS', payload: listing.bathrooms });
    dispatch({ type: 'SET_ADDRESS', payload: listing.address });
    dispatch({ type: 'SET_BUILDING', payload: listing.building });
    dispatch({ type: 'SET_CITY_ID', payload: listing.city_id });
    dispatch({ type: 'SET_DISTRICT_ID', payload: listing.district_id });
    dispatch({ type: 'SET_CITY_NAME', payload: listing.city_name });
    dispatch({ type: 'SET_DISTRICT_NAME', payload: listing.district_name });
    dispatch({ type: 'SET_INSTANT_BOOK', payload: listing.short_term_room.instant_book });
    dispatch({
      type: 'SET_BOOKING_CANCEL',
      payload: listing.short_term_room.settings.no_booking_cancel
    });
    dispatch({ type: 'SET_RENT_TYPE', payload: listing.short_term_room.rent_type });
    dispatch({
      type: 'SET_CHECKIN',
      payload: listing.short_term_room.checkin ? listing.short_term_room.checkin : '14:00:00'
    });
    dispatch({
      type: 'SET_CHECKOUT',
      payload: listing.short_term_room.checkout ? listing.short_term_room.checkout : '12:00:00'
    });
    dispatch({
      type: 'SET_COORDINATE',
      payload: {
        lat: Number(listing.latitude),
        lng: Number(listing.longitude)
      }
    });
    return listing;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: true });
  }
};

export const getDataPlacesListing = async (
  id: any,
  dispatch: Dispatch<UpdateDetailsActions>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}?include=places`);
    const listing = res.data.data;
    const room_id = listing.room_id;

    dispatch({ type: 'SET_ROOM_ID', payload: room_id });
    dispatch({ type: 'SET_PLACES', payload: listing.places.data });
    dispatch({
      type: 'SET_COORDINATE',
      payload: {
        lat: Number(listing.latitude),
        lng: Number(listing.longitude)
      }
    });
    return listing;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: true });
  }
};

export const getGuideBookList = async (dispatch: Dispatch<UpdateDetailsActions>): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`guidebookcategories`);
    const guidebooks = res.data.data;

    dispatch({ type: 'SET_GUIDEBOOKS', payload: guidebooks });
    return guidebooks;
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: true });
  }
};

export const handleUpdateRentAndRoomType = async (room_id: any, option: any, checked: number) => {
  const cookies = new Cookies();
  const token = cookies.get('_token');
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios_merchant.put(
    `long-term/room/minor-update/${room_id}/${option}`,
    {
      [`${option}`]: checked
    },
    headers
  );

  return response.data;
};
