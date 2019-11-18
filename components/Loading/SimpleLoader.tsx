import animationData from '@/assets/lottie/simple_loader.json';
import React, { FC } from 'react';
import Lottie, { LottieProps, Options } from 'react-lottie';

interface IProps extends Partial<LottieProps> { }

const defaultOptions: Options = {
  loop: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const SimpleLoader: FC<IProps> = (props) => {
  return (
    <span>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={props.height || 25}
        width={props.width || 70}
      />
    </span>
  );
};

export default SimpleLoader;
