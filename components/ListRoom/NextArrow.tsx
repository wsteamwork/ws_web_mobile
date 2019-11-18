import Fab from '@material-ui/core/Fab';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import React, { FC, Fragment } from 'react';
import { CustomArrowProps } from 'react-slick';

interface IProps extends CustomArrowProps { }

const NextArrow: FC<IProps> = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <Fragment>
      <Fab
        className={classNames('nextArrow', props.className)}
        onClick={onClick}
        disableRipple={true}>
        <ArrowForwardIos className="arrowIcon" />
      </Fab>
    </Fragment>
  );
};

export default NextArrow;
