import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useContext, useEffect, useState, FC} from 'react';
import {compose} from 'recompose';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import NotFoundResource from '@/pages/not-found-resource';
import SimpleLoader from '../Loading/SimpleLoader';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
  })
);

// @ts-ignore
const RoomListingInfinite: FC<IProps> = (props: IProps) => {
  const {classes}               = props;
  const { state: stateIndexRoom } = useContext(RoomIndexContext);
  const { longtermRooms, meta, isLoading } = stateIndexRoom;
  console.log(longtermRooms);

  // const [isEmpty, setIsEmpty]   = useState<boolean>(false);
  // const [isLoading, setLoading] = useState<boolean>(false);
  // const {location}              = useContext<IGlobalContext>(GlobalContext);
  // const {state, dispatch}       = useContext<IRoomIndexContext>(RoomIndexContext);

  // const {rooms, meta, isLoadMore} = state;

  // const lazyLoadRooms = () => {
  //   if (isLoadMore && rooms.length > 0) loadMoreRooms(state, dispatch);
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch({
  //     type: 'setRooms',
  //     rooms: [],
  //   });
  //   getRooms(location).then((data) => {
  //     const roomData   = data.data;
  //     const pagination = data.meta;
  //     setLoading(false);
  //     dispatch({
  //       type: 'setRooms',
  //       rooms: roomData,
  //       meta: pagination,
  //     });
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }, [location]);

  // useEffect(() => {
  //   setIsEmpty((meta !== null) && (rooms.length === 0) && !isLoading);
  // }, [rooms, isLoading]);

  // useEffect(() => {
  //   let isLoadMore = !!(rooms && meta);

  //   dispatch({
  //     type: 'setLoadMore',
  //     isLoadMore,
  //   });
  // }, [!!meta]);
  return (
    <Fragment>
    {/* <InfiniteScroll
        loadMore = {lazyLoadRooms}
        hasMore = {isLoadMore && !isLoading && !isEmpty}
        threshold = {1400}
        loader = {<SimpleLoader key = {1} height = {200} width = {300} />}
      >
        <Grid container spacing = {2} justify = 'center' className = {classNames({
          [classes.root]: !isLoadMore,
        })}>
          {rooms.length !== 0 ? _.map(rooms, (room) => (
            <Grid key = {room.id} item sm ={11} md = {12} lg = {12}>
              <RoomCardNew room = {room} />
            </Grid>
          )) : (!isEmpty ? (
            <SimpleLoader height = {200} width = {300} />
          ) : '')}
          {isEmpty ? <NotFoundResource height = {250} width = {250} /> : ''}
        </Grid>
      </InfiniteScroll> */}
    </Fragment>
  );
};

export default RoomListingInfinite;
