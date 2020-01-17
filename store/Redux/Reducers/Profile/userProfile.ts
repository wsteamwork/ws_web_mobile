import { updateObject } from '@/store/Context/utility';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { ProfileViewInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { axios } from '@/utils/axiosInstance';
import { Dispatch, Reducer } from 'redux';
import { ReducresActions } from '..';

export type UserProfileActions =
  | { type: 'SET_PROFILE_USER'; payload: ProfileViewInfoRes }
  | { type: 'SET_ROOMS_USER'; payload: RoomIndexRes[] }
  | { type: 'SET_LTROOMS_USER'; payload: LTRoomIndexRes[] }
  | { type: 'SET_ERROR_USER_PROFILE'; payload: boolean };

export type UserProfileState = {
  readonly profile: ProfileViewInfoRes | null;
  readonly userRooms: RoomIndexRes[];
  readonly userLTRooms?: LTRoomIndexRes[];
  readonly error: boolean;
};

export const init: UserProfileState = {
  profile: null,
  userRooms: [],
  userLTRooms: [],
  error: false
};

export const userProfileReducer: Reducer<UserProfileState, UserProfileActions> = (
  state: UserProfileState = init,
  action: UserProfileActions
): UserProfileState => {
  switch (action.type) {
    case 'SET_PROFILE_USER':
      return updateObject(state, { profile: action.payload });
    case 'SET_ROOMS_USER':
      return updateObject(state, { userRooms: action.payload });
    case 'SET_LTROOMS_USER':
      return updateObject(state, { userLTRooms: action.payload });
    case 'SET_ERROR_USER_PROFILE':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getProfileById = async (
  idUser: any,
  initLanguage: string = 'en'
): Promise<ProfileViewInfoRes> => {
  const res: AxiosRes<ProfileViewInfoRes> = await axios.get(`/profile/${idUser}`, {
    headers: { 'Accept-Language': initLanguage }
  });
  return res.data.data;
};

export const getRoomMerchantById = async (
  idUser: any,
  initLanguage: string = 'en'
): Promise<RoomIndexRes[]> => {
  const res: AxiosRes<RoomIndexRes[]> = await axios.get(
    `rooms?merchant=${idUser}&include=reviews.user,details,media,city,district`,
    { headers: { 'Accept-Language': initLanguage } }
  );
  return res.data.data;
};
export const getLTRoomMerchantById = async (
  idUser: any,
  initLanguage: string = 'en'
): Promise<LTRoomIndexRes[]> => {
  const res: AxiosRes<LTRoomIndexRes[]> = await axios.get(
    `long-term-rooms?merchant=${idUser}&limit=100`,
    {
      headers: { 'Accept-Language': initLanguage }
    }
  );
  return res.data.data;
};

export const getDataViewProfile = async (
  id: any,
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'en'
): Promise<Omit<UserProfileState, 'error'>> => {
  try {
    const res = await Promise.all([
      getProfileById(id, initLanguage),
      getRoomMerchantById(id, initLanguage),
      getLTRoomMerchantById(id, initLanguage)
    ]);
    const [profile, userRooms, userLTRooms] = res;
    // const [profile, userRooms] = res;
    dispatch({ type: 'SET_PROFILE_USER', payload: profile });
    dispatch({ type: 'SET_ROOMS_USER', payload: userRooms });
    dispatch({ type: 'SET_LTROOMS_USER', payload: userLTRooms });
    dispatch({ type: 'SET_ERROR_USER_PROFILE', payload: false });
    // return { profile, userRooms };
    return { profile, userRooms, userLTRooms };
  } catch (error) {
    dispatch({ type: 'SET_ERROR_USER_PROFILE', payload: true });
  }
};
