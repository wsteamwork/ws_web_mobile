import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, ReactNode, useMemo } from 'react';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { SwiperOptions } from 'swiper';

interface Iprops<T> extends ReactIdSwiperProps {
  classCustom?: any;
  headTitle?: string;
  listData?: T[];
  itemRender?: (item: T, size?: number | string) => ReactNode;
  itemWidth?: number | string;
  itemHeight?: number | string;
  gutter?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  sizeIcon?: number | string;
  margin?: number | string;
  paddingItem?: number | string;
  isDependencies?: boolean;
  slidePerView?: number;
  spaceBetween?: number;
  swiperParams?: any;

  //breakpoints props
  styleSmUp?: SwiperOptions;
  styleMdUp?: SwiperOptions;
  styleLgUp?: SwiperOptions;
  styleXlUp?: SwiperOptions;
}

const useStyles = makeStyles<Theme, Iprops<any>>((theme: Theme) =>
  createStyles({
    titleContainer: {
      marginBottom: '1rem',
      paddingLeft: '1rem',
      WebkitBoxAlign: 'baseline',
      WebkitBoxPack: 'justify',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      display: 'inline-flex',
      position: 'relative'
    },
    titleText: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: '26px',
      letterSpacing: '-0.6px',
      color: 'inherit',
      margin: '0px',
      padding: '0px'
    },
    propertyItemContainer: {
      height: (props) => props.itemHeight,
      width: (props) => props.itemWidth,
      margin: (props) => props.margin,
      padding: (props) => props.paddingItem,
      paddingLeft: (props) => props.paddingLeft,
      paddingRight: (props) => props.paddingRight
    },
    propertyListHorizontalScroll: {},
    spaceList: {
      margin: (props) => props.margin
    },
    propertyList: {
      // padding: (props) => props.paddingItem,
    }
  })
);

const HorizontalScrollLayout = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const {
    headTitle,
    listData,
    itemRender,
    itemHeight,
    sizeIcon,
    classCustom,
    isDependencies,
    slidePerView,
    spaceBetween,
    paddingLeft,
    paddingRight,
    swiperParams,

    //breakpoints props
    styleSmUp,
    styleMdUp,
    styleLgUp,
    styleXlUp
  } = props;

  const renderList = useMemo(
    () => listData.map((item, index) => <Grid key={index}>{itemRender(item, sizeIcon)}</Grid>),
    [isDependencies == false ? null : itemRender]
  );
  //600px    960px    1280px   1920px

  const breakpoints = {
    //xlUp
    1920: styleXlUp,
    //lgUp
    1280: styleLgUp,
    //mdUp
    960: styleMdUp,
    //smUp
    600: styleSmUp
  };

  return (
    <Fragment>
      {headTitle && (
        <Grid className={classes.titleContainer}>
          <Grid className={classes.titleText}>{headTitle}</Grid>
        </Grid>
      )}
      <div className={classes.propertyItemContainer}>
        <Swiper {...swiperParams} {...breakpoints}>
          {renderList}
        </Swiper>
      </div>
    </Fragment>
  );
};
HorizontalScrollLayout.defaultProps = {
  swiperParams: {
    slidesPerView: 2.1,
    spaceBetween: 5,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }
};
export default HorizontalScrollLayout;
