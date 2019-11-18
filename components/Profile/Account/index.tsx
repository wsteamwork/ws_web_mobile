import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';
import { useSelector } from 'react-redux';
import VerifyEmail from './VerifyEmail';
import VerifyID from './VerifyID';
import VerifyPhone from './VerifyPhone';

interface VerifySection {
  render?: any;
  title?: string;
}

const VerifySection: FC<VerifySection> = (props) => (
  <Grid className="verification-section">
    <Grid className="verification-section-wrapper">
      <Grid container className="verification-section-top">
        <Grid item xs={11} className="section-title-box">
          <Typography className="section-title">{props.title}</Typography>
        </Grid>
        <Grid item xs={1}>
          {/* <button className="section-edit">Edit</button> */}
        </Grid>
      </Grid>

      <Grid className="verfication-description">{props.render()}</Grid>
    </Grid>
  </Grid>
);

const Account: FC = (props) => {
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography className="account-title">{t('profile:account:title')}</Typography>
      <Grid className="account-verification-wrapper">
        <VerifySection title={t('profile:account:email')} render={() => <VerifyEmail />} />

        <VerifySection title={t('profile:account:phoneNumber')} render={() => <VerifyPhone />} />
        <VerifySection title={t('profile:account:identity')} render={() => <VerifyID />} />
      </Grid>
    </Fragment>
  );
};

export default Account;
