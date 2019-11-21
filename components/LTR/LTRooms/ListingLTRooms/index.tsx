import GridContainer from '@/components/Layout/Grid/Container';
import ListRoom from '@/components/ListRoom';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import LTRoomCardListing from '@/components/LTR/LTRooms/LTRoomCardListing';
import NotFound from '@/components/Rooms/Lotte/NotFound';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { updateRouter } from '@/store/Context/utility';
import { Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Pagination from 'rc-pagination';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import RoomCardItem from '@/components/RoomCardItem';

interface IProps {
  classes?: any;
  pageChange?(current: number, pageSize: number): void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    titleList: {
      marginTop: 48,
      fontWeight: 600
    }
  })
);

const ListingLTRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { state: stateIndexRoom } = useContext(RoomIndexContext);
  const { longtermRooms, meta, isLoading } = stateIndexRoom;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const changePage = (current: number) => {
    setCurrentPage(current);
    updateRouter('/long-term-rooms', true, 'page', current);
  };

  useEffect(() => {
    if (meta && meta.pagination) setCurrentPage(meta.pagination.current_page);
  }, [meta]);
  
  useEffect(() => {
    setIsEmpty(meta !== null && longtermRooms.length === 0 && !isLoading);
  }, [longtermRooms, isLoading]);

  return (
    <Grid container item xs={12} justify="center">
      {longtermRooms.length && !isLoading ? (
        <Fragment>
          <LazyLoad>
          {longtermRooms.map((room, index) => <RoomCardItem room={room} key={index} />)}
          </LazyLoad>
          <Pagination
            className="rooms-pagination-lt"
            total={meta.pagination.total}
            pageSize={meta.pagination.per_page}
            current={currentPage}
            onChange={changePage}
          />
        </Fragment>
      ) : !isEmpty ? (
        <Grid>
          <LoadingSkeleton type={'rooms'} duplicate={5} />
        </Grid>
      ) : (
        <NotFound height={250} width={250} />
      )}
    </Grid>
  );
};

export default ListingLTRooms;
