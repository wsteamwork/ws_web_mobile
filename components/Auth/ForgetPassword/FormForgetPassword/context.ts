import { ForgetPasswordReq } from '@/types/Requests/Account/AccountRequests';
import { axios } from '@/utils/axiosInstance';
import { AxiosResponse } from 'axios';
import { ForgetPasswordRes } from '@/types/Requests/Account/AccountResponses';

export const sendForgetPassword = async (body: ForgetPasswordReq): Promise<ForgetPasswordRes> => {
  const res: AxiosResponse<ForgetPasswordRes> = await axios.post('forget-password', body);
  return res.data;
};
