import { Fab } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import classNames from 'classnames';
import React, { FC, Fragment } from 'react';
import { CustomArrowProps } from 'react-slick';
interface IProps extends CustomArrowProps { }

const NextArrow: FC<IProps> = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <Fragment>
      <Fab
        className={classNames('prevArrow', props.className)}
        onClick={onClick}
        disableRipple={true}>
        <ArrowBackIos className="arrowIcon" />
      </Fab>
    </Fragment>
  );
};

export default NextArrow;
