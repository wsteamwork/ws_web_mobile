import { updateObject } from '@/store/Context/utility';
import {
  IPriceLongTerm,
  IPriceShortTerm
} from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { IServicesFee } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { axios_merchant } from '@/utils/axiosInstance';
import { Dispatch } from 'react';
import { Reducer } from 'redux';

export type PriceTermState = {
  readonly priceST: IPriceShortTerm;
  readonly priceLT: IPriceLongTerm;
  readonly serviceFee: IServicesFee;
  readonly all_fee_included_in_prices;
  error: boolean;
};

export type PriceTermActions =
  | { type: 'setPriceST'; payload: IPriceShortTerm }
  | { type: 'setPriceLT'; payload: IPriceLongTerm }
  | { type: 'setServiceFee'; payload: IServicesFee }
  | { type: 'setAllFeeIncluded'; payload: number }
  | { type: 'setError'; payload: boolean };

export const init: PriceTermState = {
  priceST: null,
  priceLT: null,
  serviceFee: { included_fee: [] },
  all_fee_included_in_prices: 1,
  error: false
};

export const PriceTermReducer: Reducer<PriceTermState, PriceTermActions> = (
  state: PriceTermState = init,
  action: PriceTermActions
): PriceTermState => {
  switch (action.type) {
    case 'setPriceST':
      return updateObject(state, { priceST: action.payload });
    case 'setPriceLT':
      return updateObject(state, { priceLT: action.payload });
    case 'setServiceFee':
      return updateObject(state, { serviceFee: action.payload });
    case 'setAllFeeIncluded':
      return updateObject(state, { all_fee_included_in_prices: action.payload });
    case 'setError':
      return updateObject(state, { error: action.payload });
    default:
      return state;
  }
};

export const getPrice = async (id: any, dispatch: Dispatch<PriceTermActions>): Promise<any> => {
  try {
    const res: AxiosRes<any> = await axios_merchant.get(`long-term-rooms/${id}`);
    dispatch({ type: 'setPriceST', payload: res.data.data.short_term_room });
    dispatch({
      type: 'setPriceLT',
      payload: res.data.data.prices.prices ? res.data.data.prices.prices : null
    });
    dispatch({
      type: 'setServiceFee',
      payload: {
        [`included_fee`]: res.data.data.prices.included_fee ? res.data.data.prices.included_fee : []
      }
    });
    dispatch({
      type: 'setAllFeeIncluded',
      payload:
        res.data.data.prices.all_fee_included_in_prices !== undefined
          ? res.data.data.prices.all_fee_included_in_prices
          : 1
    });
    return 1;
  } catch (error) {
    dispatch({ type: 'setError', payload: true });
  }
};

