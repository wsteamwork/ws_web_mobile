import { GlobalContext } from '@/store/Context/GlobalContext';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useContext } from 'react';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-parallax';
import BoxInfoBasic from '../BoxInfoBasic';
import '/styles/pages/LTR/room/index.scss';
import ProgressiveImage from 'react-progressive-image';

interface IProps {
  classes?: any,
  isPreviewPage?: boolean,
  backgroundImage?: string;
  room: any;
  scrollTo?: void
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxContainer: {
      height: '100vh',
      width: '100%',
      // backgroundImage: (props) => props.backgroundImage || 'url(@/../../../../static/images/room_demo.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
    },
    boxInfo: {
      position: 'absolute',
      width: '90%',
      borderRadius: 20,
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px',
      [theme.breakpoints.up('sm')]: {
        height: 'auto',
        maxWidth: '50%',
        bottom: 0,
        transform: 'translate(-50%, -50%)',
      }
    },
    imgRoom: {
      // maxHeight: '60vh',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      '&:hover': {
        MsTransform: 'scale(1.008)' /* IE  */,
        WebkitTransform: 'scale(1.008)' /* Safari */,
        transform: 'scale(1.008)'
      },
    },
    parallaxContainer: {
      width: '100%',
    },
    contentParallax: {
      justifyContent: 'center',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    },
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isPreviewPage, room, scrollTo } = props;
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const parallaxData = [
    {
      start: 0,
      duration: width === 'sm' ? 1800 : width === 'md' ? 3800 : 1000,
      properties: [
        {
          startValue: 0,
          endValue: 500,
          property: "translateY"
        },
        {
          startValue: 1,
          endValue: 0.05,
          property: "scaleY"
        },
        {
          startValue: 1,
          endValue: -1,
          property: "opacity"
        }
      ]
    },
  ];

  const parallaxData2 = [
    {
      start: 0,
      end: 900,
      properties: [
        {
          startValue: 660,
          endValue: 0,
          property: "translateY"
        },
      ]
    },
  ];

  return (
    <Parallax
      bgImage={props.backgroundImage}
      strength={50}
      bgClassName={classes.imgRoom}
      className={classes.parallaxContainer}
      contentClassName={classes.contentParallax}>
      <div className={classes.insideParalax}>
        <div className={classes.boxContainer}>
          <div className={classes.boxInfo}>
            <BoxInfoBasic showButtonBook
              name={isPreviewPage && !room.about_room ? t('room:updateRoomName') : room.about_room.name}
              district={room.district.data.name}
              city={room.city.data.name}
              price={room.price_display}
            />
          </div>
          {props.children}
        </div>
      </div>
    </Parallax>
  );
};

export default BoxImageLT;
