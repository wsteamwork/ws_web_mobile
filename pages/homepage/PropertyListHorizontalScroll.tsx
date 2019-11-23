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
  gutter?: number | string;
  margin?: number | string;
  paddingItem?: number | string;
}

const useStyles = makeStyles<Theme, Iprops<any>>((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center'
    },
    propertyItemContainer: {
      width: (props) => props.itemWidth,
      padding: (props) => props.paddingItem
    },
    propertyListHorizontalScroll: {
      paddingLeft: (props) => props.gutter,
      paddingRight: (props) => props.gutter
    },
    spaceList:{
      margin: (props) => props.margin
    }
  })
);

const PropertyListHorizontalScroll = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const { headTitle, listData, itemRender } = props;

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
    <section className={classNames("property-list-horizontal-scroll-container",classes.spaceList)}>
      {headTitle && (
        <Grid className="head-title-container">
          <Typography className="head-title">Popular Destinations</Typography>
        </Grid>
      )}
      <Grid
        className={classNames(
          'property-list-horizontal-scroll',
          classes.propertyListHorizontalScroll
        )}>
        {renderList}
      </Grid>
    </section>
  );
};

export default PropertyListHorizontalScroll;
