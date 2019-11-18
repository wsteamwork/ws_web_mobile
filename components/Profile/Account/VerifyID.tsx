import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { Typography } from '@material-ui/core';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import UppyImageID from './UppyImageID';

const VerifyID: FC = (props) => {
  //   const { t } = useTranslation();

  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  //   const [email, setEmail] = useState<string>(null);

  //   const verifyEmail = () => {
  //     axios
  //       .get(`verify-email`)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <Fragment>
      {profile.verify.identity_verify ? (
        <Fragment>
          <Typography>Đã cung cấp</Typography>
        </Fragment>
      ) : (
          <UppyImageID />
        )}
    </Fragment>
  );
};

export default VerifyID;
