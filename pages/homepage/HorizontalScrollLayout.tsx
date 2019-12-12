import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, ReactNode, useMemo } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';

interface Iprops<T> {
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
      position: 'relative',
    },
    titleText: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: '26px',
      letterSpacing: '-0.6px',
      color: 'inherit',
      margin: '0px',
      padding: '0px',
    },
    propertyItemContainer: {
      height: (props) => props.itemHeight,
      width: (props) => props.itemWidth,
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
    swiperParams
  } = props;


  const renderList = useMemo(
    () =>
      listData.map((item, index) => (
        <Grid
          key={index}
        >
          {itemRender(item, sizeIcon)}
        </Grid>
      )),
    [isDependencies == false ? null : itemRender]
  );

  return (
    <Fragment>
      {headTitle && (
        <Grid className={classes.titleContainer}>
          <Grid className={classes.titleText}>{headTitle}</Grid>
        </Grid>
      )}
      <div style={{ paddingLeft: paddingLeft, paddingRight: paddingRight }}>
        <Swiper {...swiperParams}>
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
      clickable: true,
    }
  }
}
export default HorizontalScrollLayout;
