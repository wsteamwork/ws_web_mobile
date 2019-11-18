import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import { CustomArrowProps } from 'react-slick';

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    x: {
      fontSize: 0,
      lineHeight: 0,
      position: 'absolute',
      top: '50%',
      zIndex: 9,
      display: 'block',
      width: 30,
      height: 30,
      minWidth: 30,
      padding: 0,
      WebkitTransform: 'translate(0, -50%)',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      color: '#273740',
      border: '1px solid #ddd',
      borderRadius: '50%',
      outline: 'none',
      background: 'transparent',
      right: -50,
      [theme!.breakpoints!.down!('md')]: {
        right: -50,
      },
      '&:hover': {
        background: 'transparent',
      }
    },
    icon: {
      width: 15,
      height: 15,
    }
  })
);

interface IProps {
  classes?: any;
  onClick?: any;
}

const NextArrowSlider: FC<IProps> = (props: CustomArrowProps) => {
  const { onClick } = props;
  const classes = useStyles(props);
  return (
    <Fragment>
      <Button
        className={classes.x}
        onClick={onClick}
        disableRipple={true}
      >
        <ArrowForwardIos className={classes.icon} />
      </Button>
    </Fragment>
  );
};

export default NextArrowSlider;
