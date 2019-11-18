import ButtonGlobal from '@/components/ButtonGlobal';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { axios } from '@/utils/axiosInstance';
import { TextField, Typography } from '@material-ui/core';
import { FC, Fragment, useEffect, useState } from 'react';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const VerifyPhone: FC = (props) => {
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const [verification, setVerification] = useState<any>({
    code: null,
    phoneNumber: profile.phone
  });
  const [isSentSms, setIsSentSms] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (verification.code && verification.code.length == 6) {
      alert('verified phone');
      // verifyPhoneNumber(verification.code).then((res) => console.log(res));
    }
  }, [verification.code]);

  const sendSmsPhoneNumber = async (phoneNumber: string): Promise<any> => {
    const req: any = {
      contact_number: phoneNumber
    };
    const res: any = await axios.post(`send-sms`, req);
    try {
      if (res) console.log('success send sms');
    } catch (error) {
      console.log(error);
    }

    return res;
  };

  const verifyPhoneNumber = async (
    code: number,
    phoneNumber: string = verification.phoneNumber
  ): Promise<any> => {
    const req: any = {
      code,
      contact_number: phoneNumber
    };
    const res: any = await axios.post(`verify-phone`, req);
    try {
      if (res) {
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    }

    return res;
  };

  const confirmPhoneNumber = () => {
    sendSmsPhoneNumber(verification.phoneNumber).then((res) => {
      setIsSentSms(true);
    });
  };
  return (
    <Fragment>
      {isSentSms ? (
        <Fragment>
          <h3>Enter 6-digit code</h3>
          <Typography>
            We sent an SMS to <b>{verification.phoneNumber}</b> . Enter the code in that message.
          </Typography>
          <TextField
            variant="outlined"
            id="sms-code"
            placeholder={'XXXXXX'}
            type="sms-code"
            name="sms-code"
            inputProps={{ maxLength: 6, haveThousandSeparator: false }}
            InputProps={{
              inputComponent: NumberFormatCustom as any
            }}
            onChange={(e) =>
              setVerification({
                ...verification,
                code: e.target.value
              })
            }
            // onBlur={handleBlur}
            value={verification.code}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <b>+84</b>
          //     </InputAdornment>
          //   )
          // }}
          />
          <br></br>
          <button onClick={() => setIsSentSms(false)} className="section-edit">
            Change my number
          </button>
          <br></br>
          <button className="section-edit">Send Code Again</button>
        </Fragment>
      ) : profile.verify.phone_verify == 1 ? (
        <Fragment>
          {profile.phone}
          Đã xác thực
        </Fragment>
      ) : (
            <Fragment>
              <PhoneInput
                country="VN"
                placeholder="Enter phone number"
                value={verification.phoneNumber}
                onChange={(value) =>
                  setVerification({
                    ...verification,
                    phoneNumber: formatPhoneNumberIntl(value)
                  })
                }
                error={
                  verification.phoneNumber
                    ? isValidPhoneNumber(verification.phoneNumber)
                      ? undefined
                      : 'Invalid phone number'
                    : 'Phone number required'
                }
              />
              <ButtonGlobal
                disabled={!verification.phoneNumber || !isValidPhoneNumber(verification.phoneNumber)}
                onClick={confirmPhoneNumber}>
                {t('profile:confirmPhoneNumber')}
              </ButtonGlobal>
            </Fragment>
          )}
    </Fragment>
  );
};

export default VerifyPhone;
