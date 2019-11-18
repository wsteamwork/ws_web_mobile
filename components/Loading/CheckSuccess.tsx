import animationData from '@/assets/lottie/checkSuccess.json';
import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import Lottie, { LottieProps, Options } from 'react-lottie';

interface IProps extends Partial<LottieProps> {
  message?: string;
}

const defaultOptions: Options = {
  loop: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const CheckSuccess: FC<IProps> = (props) => {
  return (
    <span style={{ margin: '20px 0' }}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Thành Công !
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>
        {props.message}
      </Typography>
    </span>
  );
};

export default CheckSuccess;
