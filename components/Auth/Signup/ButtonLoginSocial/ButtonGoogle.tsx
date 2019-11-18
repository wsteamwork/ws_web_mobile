import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps { }

const ButtonGoogle: FC<IProps> = () => {
  const { t } = useTranslation();

  return (
    <Grid className="buttonLoginWithSocial">
      <img src="/static/images/google.svg" alt="Google" />
      <p>{t('auth:withGoogle')}</p>
    </Grid>
  );
};

export default ButtonGoogle;
