import { Grid, Theme, Typography } from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import _ from 'lodash';
import React, { Fragment, ReactNode, useMemo } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { SwiperOptions } from 'swiper';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

interface Iprops<T> extends Partial<SwiperOptions> {
  roomData: T[];
  title?: string;
  usingSlider?: boolean;
  render?: (room: T) => ReactNode;
  spacing?: GridSpacing;
  customClass?: string;
  usingInMap?: boolean;
  hoverAction?(id: number): void;
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  xsMap?: any;
  smMap?: any;
  mdMap?: any;
  lgMap?: any;
  xlMap?: any;
}

const useStyles = makeStyles<Theme, any>((theme: Theme) =>
  createStyles({
    root: {
      // marginTop: theme.spacing(8)
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 700,
      marginTop: theme.spacing(8)
    }
  })
);

const ListRoom = <T extends any>(props: Iprops<T>) => {
  const {
    roomData,
    title,
    usingSlider,
    render,
    spacing,
    usingInMap,
    hoverAction,
    customClass = 'listRoomContainer',
    xs, sm, md, lg, xl, xsMap, smMap, mdMap, lgMap, xlMap,
    ...propsSwiper
  } = props;
  const classes = useStyles({});

  const setting = {
    slidesPerView: 5,
    lazy: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <PrevArrow className="swiper-button-prev"></PrevArrow>,
    renderNextButton: () => <NextArrow className="swiper-button-next"></NextArrow>,
    breakpoints: {
      1920: {},
      1128: {
        slidesPerView: 4
      },
      960: {
        slidesPerView: 2.3,
        freeMode: true
      },
      600: {
        slidesPerView: 1.5,
        freeMode: true
      }
    }
  };

  const renderRooms = useMemo(
    () =>
      _.map(roomData, (room, index) => (
        <Grid item key={index} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          {render(room)}
        </Grid>
      )),
    [roomData]
  );

  const renderMapRooms = useMemo(
    () =>
      _.map(roomData, (room, index) => (
        <Grid
          xs={xsMap} sm={smMap} md={mdMap} lg={lgMap} xl={xlMap}
          item
          id={`room-${room.id}`}
          key={room.id}
          onMouseEnter={() => hoverAction(room.id)}
          onMouseLeave={() => hoverAction(0)}>
          {render(room)}
        </Grid>
      )),
    [roomData]
  );

  return (
    <Fragment>
      <Grid
        container
        spacing={spacing ? spacing : 0}
        className={classNames(classes.root, customClass)}>
        {title != '' && (
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        )}
        {roomData ? (
          usingSlider ? (
            <Swiper {...setting} {...propsSwiper}>{renderRooms}</Swiper>
          ) : (
              <Fragment>{usingInMap ? renderMapRooms : renderRooms}</Fragment>
            )
        ) : (
            ''
          )}
      </Grid>
    </Fragment>
  );
};

export default ListRoom;
