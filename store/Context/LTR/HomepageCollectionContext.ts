import { LTRoomCollectionRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { BaseResponse } from '@/types/Requests/ResponseTemplate';

export const getCollectionLongTerm = async (
  collectionName
): Promise<BaseResponse<LTRoomCollectionRes[]>> => {
  const res: AxiosResponse<BaseResponse<LTRoomCollectionRes[]>> = await axios.get(
    `long-term-rooms/home-page-collection/${collectionName}`
  );
  return res.data;
};
