import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
interface Iprops<T> {
  headTitle?: string;
  listData?: T[];
  itemRender?: (item: T, size?: number | string) => ReactNode;
  itemWidth?: number | string;
  itemHeight?: number | string;
  gutter?: number | string;
  sizeIcon?: number | string;
  margin?: number | string;
  paddingItem?: number | string;
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
    propertyListHorizontalScroll: {
      padding:'0 12px 0 0'
    },
    spaceList: {
      margin: (props) => props.margin
    },
    propertyList:{
      padding:(props) => props.paddingItem,
    }
  })
);

const PropertyListHorizontalScroll = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const { headTitle, listData, itemRender, itemHeight, sizeIcon } = props;

  const renderList = useMemo(
    () =>
      listData.map((item, index) => (
        <Grid key={index} className={classNames('property-item-container', classes.propertyItemContainer)}>
          {itemRender(item, sizeIcon)}
        </Grid>
      )),
    [listData]
  );

  return (
    <section className={classNames("property-list-horizontal-scroll-container", classes.spaceList)}>
      {headTitle && (
        <Grid className="head-title-container">
          <Typography className="head-title">{headTitle}</Typography>
        </Grid>
      )}
      <Grid className={classNames('property-list-horizontal-scroll', classes.propertyList)}>{renderList}</Grid>
    </section>
  );
};

export default PropertyListHorizontalScroll;
