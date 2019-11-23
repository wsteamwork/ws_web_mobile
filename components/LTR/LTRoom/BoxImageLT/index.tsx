import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useContext, useMemo, useState, useRef } from 'react';
import 'react-animated-slider/build/horizontal.css';
import { useTranslation } from 'react-i18next';
import '/styles/pages/LTR/room/index.scss';
import BoxInfoBasic from '../BoxInfoBasic';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import Plx from 'react-plx';
interface IProps {
  classes?: any,
  isPreviewPage?: boolean,
  backgroundImage?: string;
  room: any;
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
      height: 204,
      borderRadius: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 25%)',
      background: 'rgba(255, 255, 255, 0.18)',
      backdropFilter: 'blur(27.1828px)',
      padding: '14px 18px'
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
      padding: '14px 18px'
    }
  })
);

const BoxImageLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { isPreviewPage, room } = props;
  const { t } = useTranslation();

  const parallaxData = [
    {
      start: 0,
      end: 500,
      properties: [
        {
          startValue: 1,
          endValue: 2,
          property: 'scale',
        },
      ],
    },
  ];

  return (
    <div className={classes.boxContainer}> 
      <div className={classes.boxInfo}>

      <Plx
        parallaxData={ parallaxData }
      >
        <BoxInfoBasic showRating showButtonBook 
          name={isPreviewPage && !room.about_room ? t('room:updateRoomName') : room.about_room.name}
          district={room.district.data.name}
                      city={room.city.data.name}
                      price={room.price_display}
        />
      </Plx>
      </div>
      <Grid container justify='center' alignItems='center' className={classes.boxViewMore}>
        <span style={{color:'#fff'}}>Xem chi tiết</span>
        <KeyboardArrowDownRounded style={{color:'#fff'}}/>
      </Grid>
    </div>
  );
};

export default BoxImageLT;
