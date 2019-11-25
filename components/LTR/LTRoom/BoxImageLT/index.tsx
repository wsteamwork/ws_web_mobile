import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useContext } from 'react';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import Plx from 'react-plx';
import BoxInfoBasic from '../BoxInfoBasic';
import '/styles/pages/LTR/room/index.scss';
import { GlobalContext } from '@/store/Context/GlobalContext';
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
      backgroundImage: (props) => props.backgroundImage || 'url(@/../../../../static/images/room_demo.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
    },
    boxInfo: {
      position: 'absolute',
      width: '90%',
      borderRadius: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 50%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px',
      [theme.breakpoints.only('sm')]:{
        height: 'auto',
        maxWidth: '50%',
        top: 'unset',
        bottom:'0%',
        transform: 'translate(-50%, -50%)',
      }
    },
    boxViewMore:{
      position: 'absolute',
      width: '90%',
      borderRadius: 20,
      bottom: '0%',
      left: '50%',
      transform: 'translate(-50%, -35%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px',
      [theme.breakpoints.only('sm')]:{
        width: '50%',
      }
    }
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
      end: 300,
      properties: [
        {
          startValue: width === 'sm' ? 1070 : 320,
          endValue: 0,
          property: "translateY"
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
      start: 100,
      end: 300,
      properties: [
        {
          startValue: 660,
          endValue: 0,
          property: "translateY"
        },
        {
          startValue: 1,
          endValue: -1,
          property: "opacity"
        }
      ]
    },
  ];

  return (
    <div className={classes.boxContainer}>
     {/* <Plx
        parallaxData={ parallaxData }
      > */}
        <div className={classes.boxInfo}>
          <BoxInfoBasic showButtonBook
            name={isPreviewPage && !room.about_room ? t('room:updateRoomName') : room.about_room.name}
            district={room.district.data.name}
                        city={room.city.data.name}
                        price={room.price_display}
          />
        </div>
      {/* </Plx>
      <Plx
        parallaxData={ parallaxData2 }
      > */}
       {props.children}
      {/* </Plx> */}
    </div>
  );
};

export default BoxImageLT;
