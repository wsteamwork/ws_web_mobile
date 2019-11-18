import { Dispatch, Reducer } from 'react';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { updateObject } from '@/store/Context/utility';
import {
  AxiosRes,
  Pagination,
  BaseResponse,
  AxiosErrorCustom
} from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { ReducresActions } from '..';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';

export type CancelReasonList = {
  id: number;
  value: string;
};

export type ProfileAction =
  | { type: 'SET_I_PROFILE'; payload: ProfileInfoRes }
  | { type: 'SET_DATA_STATUS_BOOKING'; payload: BookingIndexRes[] }
  | { type: 'SET_ERROR_PROFILE'; payload: boolean }
  | { type: 'SET_META_BOOKING'; payload: Pagination }
  | { type: 'SET_DATA_REVIEW'; payload: RoomReviewInfoRes }
  | { type: 'SET_ERROR_REVIEW'; payload: string }
  | { type: 'SET_BOOKING_BY_ID'; payload: BookingIndexRes }
  | { type: 'SET_TYPE_CANCEL_BOOKING'; payload: CancelReasonList[] }
  | { type: 'SET_ERROR_CANCEL_BOOKING'; payload: boolean };

export type ProfileState = {
  readonly profile: ProfileInfoRes | null;
  readonly bookings: BookingIndexRes[];
  readonly metaBookings: Pagination | null;
  readonly error: boolean;
  readonly review: RoomReviewInfoRes;
  readonly errorReview: string;
  readonly bookingById: BookingIndexRes;
  readonly typeCancel: CancelReasonList[];
  readonly errorCancelBooking: boolean;
};

export const init: ProfileState = {
  profile: null,
  bookings: [],
  error: false,
  metaBookings: null,
  review: null,
  errorReview: null,
  bookingById: null,
  typeCancel: [],
  errorCancelBooking: false
};

export const iProfileReducer: Reducer<ProfileState, ProfileAction> = (
  state: ProfileState = init,
  action: ProfileAction
) => {
  switch (action.type) {
    case 'SET_DATA_STATUS_BOOKING':
      return updateObject(state, { bookings: action.payload });
    case 'SET_I_PROFILE':
      return updateObject(state, { profile: action.payload });
    case 'SET_ERROR_PROFILE':
      return updateObject(state, { error: action.payload });
    case 'SET_META_BOOKING':
      return updateObject(state, { metaBookings: action.payload });
    case 'SET_DATA_REVIEW':
      return updateObject(state, { review: action.payload });
    case 'SET_ERROR_REVIEW':
      return updateObject(state, { errorReview: action.payload });
    case 'SET_BOOKING_BY_ID':
      return updateObject(state, { bookingById: action.payload });
    case 'SET_TYPE_CANCEL_BOOKING':
      return updateObject(state, { typeCancel: action.payload });
    case 'SET_ERROR_CANCEL_BOOKING':
      return updateObject(state, { errorCancelBooking: action.payload });
    default:
      return state;
  }
};

export const getProfile = async (
  dispath: Dispatch<ReducresActions>,
  initLanguage: string = 'vi',
  token?: string
): Promise<ProfileInfoRes> => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };

  try {
    const res: AxiosRes<ProfileInfoRes> = await axios.get('profile?include=city,district', headers);
    dispath({ type: 'SET_I_PROFILE', payload: res.data.data });
    dispath({ type: 'SET_ERROR_PROFILE', payload: false });
    return res.data.data;
  } catch (err) {
    dispath({ type: 'SET_ERROR_PROFILE', payload: true });
  }
};

export const getUserBookingList = async (
  status: number,
  page: number = 1
): Promise<BaseResponse<BookingIndexRes[]>> => {
  const res: AxiosResponse<BaseResponse<BookingIndexRes[]>> = await axios.get(
    `bookings?include=room.details,room.media&status=${status}&size=5&page=${page}`
  );

  return res.data;
};

export const getReviews = async (
  dispath: Dispatch<ReducresActions>,
  id: any,
  initLanguage: string = 'vi',
  token?: string
): Promise<RoomReviewInfoRes> => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };

  try {
    const res: AxiosRes<RoomReviewInfoRes> = await axios.get(
      `reviews/${id}?token=${token}`,
      headers
    );
    dispath({ type: 'SET_DATA_REVIEW', payload: res.data.data });
    dispath({ type: 'SET_ERROR_REVIEW', payload: null });
    return res.data.data;
  } catch (error) {
    const result: AxiosErrorCustom<{ error: string }> = error;
    dispath({ type: 'SET_ERROR_REVIEW', payload: result.response.data.data.error });
  }
};

export const getBookingById = async (
  id: any,
  initLanguage: string = 'vi',
  token?: string
): Promise<BookingIndexRes> => {
  const headers = token && {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': initLanguage
    }
  };

  const res: AxiosRes<BookingIndexRes> = await axios.get(
    `bookings/${id}?include=room.details,room.media,cancel`,
    headers
  );
  return res.data.data;
};

export const getTypeCancel = async (initLanguage: string = 'vi'): Promise<CancelReasonList[]> => {
  const res: AxiosResponse<CancelReasonList[]> = await axios.get(`bookings/cancel-reason-list`, {
    headers: { 'Accept-Language': initLanguage }
  });
  return res.data;
};

export const getPageBookingCancel = async (
  dispath: Dispatch<ReducresActions>,
  id: any,
  initLanguage: string = 'vi',
  token?: string
): Promise<Pick<ProfileState, 'bookingById' | 'typeCancel'>> => {
  try {
    const res = await Promise.all([
      getBookingById(id, initLanguage, token),
      getTypeCancel(initLanguage)
    ]);
    const [bookingById, typeCancel] = res;

    dispath({ type: 'SET_BOOKING_BY_ID', payload: bookingById });
    dispath({ type: 'SET_TYPE_CANCEL_BOOKING', payload: typeCancel });
    dispath({ type: 'SET_ERROR_CANCEL_BOOKING', payload: false });

    return { bookingById, typeCancel };
  } catch (error) {
    const result: AxiosErrorCustom<{ content: string }> = error;
    dispath({ type: 'SET_ERROR_CANCEL_BOOKING', payload: true });
  }
};
