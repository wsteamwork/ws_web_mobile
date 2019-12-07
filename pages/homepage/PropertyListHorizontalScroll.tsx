import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
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

const PropertyListHorizontalScroll = <T extends any>(props: Iprops<T>) => {
  const classes = useStyles(props);

  const { headTitle, listData, itemRender, itemHeight, sizeIcon, classCustom, isDependencies } = props;
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
    <section className={classNames('property-list-horizontal-scroll-container', classes.spaceList)}>
      {headTitle && (
        <Grid className="head-title-container">
          <Typography className="head-title">{headTitle}</Typography>
        </Grid>
      )}
      <Grid className={classNames('property-list-horizontal-scroll', classes.propertyList)}>{renderList}</Grid>
      {/* {useMemo(
        () => (
          <Grid className={'property-list-horizontal-scroll'}>{renderList}</Grid>
        ),
        [listData]
      )} */}
    </section>
  );
};

export default PropertyListHorizontalScroll;
