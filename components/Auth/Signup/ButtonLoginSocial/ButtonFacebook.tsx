import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps {
  onClick: () => void;
}

const ButtonFacebook: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { onClick } = props;

  return (
    <Grid onClick={onClick} className="buttonLoginWithSocial">
      <img src="/static/images/facebook.svg" alt="Facebook" />
      <p>{t('auth:withFacebook')}</p>
    </Grid>
  );
};

export default ButtonFacebook;
