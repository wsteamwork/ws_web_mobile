import { LoginRequest } from '@/types/Requests/Account/AccountRequests';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { LoginRes } from '@/types/Requests/Account/AccountResponses';

export const loginAccount = async (body: LoginRequest): Promise<LoginRes> => {
  const res: AxiosResponse<LoginRes> = await axios.post('login', body);
  return res.data;
};
