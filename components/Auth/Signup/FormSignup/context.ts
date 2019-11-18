import { RegisterReq } from '@/types/Requests/Account/AccountRequests';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { LoginRes } from '@/types/Requests/Account/AccountResponses';

export const registerAccount = async (body: RegisterReq): Promise<LoginRes> => {
  const res: AxiosResponse<LoginRes> = await axios.post('register', body);
  return res.data;
};
