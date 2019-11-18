import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { axios } from '@/utils/axiosInstance';
import { Grid, Typography } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';

const VerifyEmail: FC = (props) => {
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  //   const [email, setEmail] = useState<string>(null);

  const verifyEmail = () => {
    axios
      .get(`verify-email`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {profile.verify.email_verify ? (
        <Grid>
          Đã xác thực
          <Typography>{profile.email}</Typography>
        </Grid>
      ) : (
          <Fragment>
            <button onClick={verifyEmail} className="section-edit">
              Verify Your Email
          </button>
            <br></br>
            Email của bạn chưa được xác thực
        </Fragment>
        )}
    </Fragment>
  );
};

export default VerifyEmail;
