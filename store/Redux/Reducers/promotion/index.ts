import { Reducer, Dispatch } from 'redux';
import { updateObject } from '@/store/Context/utility';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { ReducresActions } from '..';
import { PromotionRes } from '@/types/Requests/Promotion/PromotionResponse';

export type PomotionActions =
  | { type: 'SET_PROMOTIONS'; payload: PromotionRes[] }
  | { type: 'SET_PROMOTION'; payload: PromotionRes };

export type PomotionState = {
  readonly promotions: PromotionRes[];
  readonly promotion: PromotionRes;
};

export const init: PomotionState = {
  promotions: [],
  promotion: null
};

export const promotionReducer: Reducer<PomotionState, PomotionActions> = (
  state: PomotionState = init,
  action: PomotionActions
): PomotionState => {
  switch (action.type) {
    case 'SET_PROMOTIONS':
      return updateObject(state, { promotions: action.payload });
    case 'SET_PROMOTION':
      return updateObject(state, { promotion: action.payload });
    default:
      return state;
  }
};

export const getDataPromotions = async (
  dispatch: Dispatch<ReducresActions>,
  initLanguage: string = 'vi'
): Promise<PromotionRes[]> => {
  const res: AxiosRes<PromotionRes[]> = await axios.get('promotions?include=coupons', {
    headers: { 'Accept-Language': initLanguage }
  });
  dispatch({ type: 'SET_PROMOTIONS', payload: res.data.data });
  return res.data.data;
};

export const getPromotionsById = async (
  dispatch: Dispatch<ReducresActions>,
  id: any,
  initLanguage: string = 'vi'
): Promise<PromotionRes> => {
  const res: AxiosRes<PromotionRes> = await axios.get(`promotions/${id}?include=coupons`, {
    headers: { 'Accept-Language': initLanguage }
  });
  dispatch({ type: 'SET_PROMOTION', payload: res.data.data });
  return res.data.data;
};
