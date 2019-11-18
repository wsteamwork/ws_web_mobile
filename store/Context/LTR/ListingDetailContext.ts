import { updateObject } from '@/store/Context/utility';
import { createContext, Dispatch, Reducer } from 'react';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios } from '@/utils/axiosInstance';
import Router from 'next/router';
import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';

export const ListingDetailContext = createContext<IListingDetailContext>(
  null as IListingDetailContext
);

export interface IListingDetailContext {
  state: ListingDetailState;
  dispatch: Dispatch<ListingDetailAction>;
}

export type ListingDetailState = {
  readonly listing: any;
  avatar_image: ImagesRes;
  cover_photo: ImagesRes;
  livingrooms: ImagesRes;
  bedrooms: any;
  kitchens: ImagesRes;
  bathrooms: any;
  outdoors: ImagesRes;
  furnitures: ImagesRes;
};

export type ListingDetailAction =
  | { type: 'setListing'; payload: any }
  | { type: 'setAvatarImage'; payload: ImagesRes }
  | { type: 'setCoverImage'; payload: ImagesRes }
  | { type: 'setLivingRoomImage'; payload: ImagesRes }
  | { type: 'setKitchensImage'; payload: ImagesRes }
  | { type: 'setOutdoorsImage'; payload: ImagesRes }
  | { type: 'setFurnituresImage'; payload: ImagesRes }
  | { type: 'setBedRoomImage'; payload: any }
  | { type: 'setBathRoomImage'; payload: any };

export const ListingDetailStateInit: ListingDetailState = {
  listing: null,
  avatar_image: { images: [] },
  cover_photo: { images: [] },
  livingrooms: { images: [] },
  bedrooms: {},
  kitchens: { images: [] },
  bathrooms: {},
  outdoors: { images: [] },
  furnitures: { images: [] }
};

export const ListingDetailReducer: Reducer<ListingDetailState, ListingDetailAction> = (
  state: ListingDetailState,
  action: ListingDetailAction
): ListingDetailState => {
  switch (action.type) {
    case 'setListing':
      return updateObject<ListingDetailState>(state, { listing: action.payload });
    case 'setAvatarImage':
      return updateObject<ListingDetailState>(state, { avatar_image: action.payload });
    case 'setCoverImage':
      return updateObject<ListingDetailState>(state, { cover_photo: action.payload });
    case 'setLivingRoomImage':
      return updateObject<ListingDetailState>(state, { livingrooms: action.payload });
    case 'setKitchensImage':
      return updateObject<ListingDetailState>(state, { kitchens: action.payload });
    case 'setOutdoorsImage':
      return updateObject<ListingDetailState>(state, { outdoors: action.payload });
    case 'setFurnituresImage':
      return updateObject<ListingDetailState>(state, { furnitures: action.payload });
    case 'setBedRoomImage':
      return updateObject<ListingDetailState>(state, {
        bedrooms: { ...state.bedrooms, ...action.payload }
      });
    case 'setBathRoomImage':
      return updateObject<ListingDetailState>(state, {
        bathrooms: { ...state.bathrooms, ...action.payload }
      });
    default:
      return state;
  }
};

export const getListingDetail = async (
  id: any,
  dispatch: Dispatch<ListingDetailAction>
): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios.get(`long-term-rooms/${id}`);
    dispatch({ type: 'setListing', payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const handleSubmitImage = async (id: string | number, data: any) => {
  try {
    const res = await axios.post(`long-term/room/step2/tab3/${id}`, { step2: { tab3: data } });
  } catch (error) {}
};
