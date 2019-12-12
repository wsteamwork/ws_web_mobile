import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
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
  sizeIcon?: number | string;
  margin?: number | string;
  paddingItem?: number | string;
  isDependencies?: boolean;
}

const useStyles = makeStyles<Theme, Iprops<any>>((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center'
    },
    propertyItemContainer: {
      height: (props) => props.itemHeight,
      width: (props) => props.itemWidth,
      padding: (props) => props.paddingItem,
      paddingLeft: (props) => props.gutter,
      paddingRight: (props) => props.gutter
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

const SwiperList = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const {
    headTitle,
    listData,
    itemRender,
    itemHeight,
    sizeIcon,
    classCustom,
    isDependencies
  } = props;

  const setting = {
    slidesPerView: 1,
    lazy: true,
    spaceBetween: 30,
    freeMode: true
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // },
    // renderPrevButton: () => <PrevArrow className="swiper-button-prev"></PrevArrow>,
    // renderNextButton: () => <NextArrow className="swiper-button-next"></NextArrow>,
    // breakpoints: {
    //   1920: {},
    //   1128: {
    //     slidesPerView: 4
    //   },
    //   960: {
    //     slidesPerView: 2.3,
    //     freeMode: true
    //   },
    //   600: {
    //     slidesPerView: 1.5
    //   }
    // }
  };

  const renderList = useMemo(
    () =>
      listData.map((item, index) => (
        <Grid
          key={index}
          className={classNames('property-item-container', classes.propertyItemContainer)}>
          {itemRender(item, sizeIcon)}
        </Grid>
      )),
    [isDependencies == false ? null : itemRender]
  );

  return (
    <section className={classNames(classes.spaceList)}>
      {headTitle && (
        <Grid className="head-title-container">
          <Typography className="head-title">{headTitle}</Typography>
        </Grid>
      )}
      <Swiper {...setting}>{renderList}</Swiper>
      {/* <Grid className={classNames(classes.propertyList)}>{renderList}</Grid> */}
    </section>
  );
};

export default SwiperList;
