import animationData from '@/assets/lottie/empty_status.json';
import { Typography } from '@material-ui/core';
import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
interface IProps {
  height?: number;
  width?: number;
}

const NotFound: ComponentType<IProps> = (props) => {
  const { t } = useTranslation();

  const defaultOptions: any = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <span style={{ margin: '20px 0' }}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        {t('rooms:notFoundTitle')}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>
        {t('rooms:notFoundContent')}
      </Typography>
    </span>
  );
};

export default NotFound;
