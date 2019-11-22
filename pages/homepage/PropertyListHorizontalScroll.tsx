import React, { FC, Fragment, useEffect, useState, useMemo, ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { InputAdornment, InputBase, Grid, Typography } from '@material-ui/core';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import { getRoomType, RoomTypeData } from '@/components/Rooms/FilterActions/RoomType/context';
import classNames from 'classnames';
interface Iprops<T> {
  headTitle?: string;
  listData?: T[];
  itemRender?: (item: T) => ReactNode;
  itemWidth?: number | string;
  itemHeight?: number | string;
  gutter?: number | string;
}

const useStyles = makeStyles<Theme, Iprops<any>>((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center'
    },
    propertyItemContainer: {
      height: (props) => props.itemHeight,
      width: (props) => props.itemWidth,
      paddingLeft: (props) => props.gutter,
      paddingRight: (props) => props.gutter
    }
  })
);

const PropertyListHorizontalScroll = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const { headTitle, listData, itemRender, itemHeight } = props;

  const renderList = useMemo(
    () =>
      listData.map((item, index) => (
        <Grid className={classNames('property-item-container', classes.propertyItemContainer)}>
          {itemRender(item)}
        </Grid>
      )),
    [listData]
  );

  return (
    <section className="property-list-horizontal-scroll-container">
      {headTitle && (
        <Grid className="head-title-container">
          <Typography className="head-title">Popular Destinations</Typography>
        </Grid>
      )}
      <Grid className={'property-list-horizontal-scroll'}>{renderList}</Grid>
    </section>
  );
};

export default PropertyListHorizontalScroll;
