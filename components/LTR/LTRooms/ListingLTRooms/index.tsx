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

interface IProps {
  classes?: any,
  hoverAction?(id: number): void;
  pageChange?(current: number, pageSize: number): void;
  usingInMap?: boolean;
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
  const { hoverAction, usingInMap } = props;
  const { state: stateIndexRoom } = useContext(RoomIndexContext);
  const { longtermRooms, meta, isLoading } = stateIndexRoom;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  // const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const renderRooms = (room) => (
    <LTRoomCardListing room={room} usingInMap={usingInMap} />
  );

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
    <GridContainer xs={11} md={11} lg={10}>
      {longtermRooms.length > 0 && !isLoading ? (
        <Fragment>
          {meta && (
            <Typography variant='h6' className={classes.titleList}>
              {meta.pagination ? `${t('rooms:totalResult')} ${meta.pagination.total} ${t('rooms:results')}` : ''}
            </Typography>)}
          <LazyLoad>
            <ListRoom
              customClass=''
              roomData={longtermRooms}
              usingSlider={false}
              title={''}
              spacing={2}
              render={renderRooms}
              usingInMap={usingInMap}
              hoverAction={hoverAction}
              xs={12} sm={6} md={4} lg={4} xl={3}
              xsMap={12} smMap={6}
            />
          </LazyLoad>
          <Pagination
            className='rooms-pagination-lt'
            total={meta.pagination.total}
            pageSize={meta.pagination.per_page}
            current={currentPage}
            onChange={changePage}
          />
        </Fragment>
      ) : !isEmpty ? (
        <Grid style={{ marginTop: 32 }}>
          <LoadingSkeleton type={'rooms'} duplicate={5} />
        </Grid>
      ) : (
            <NotFound height={250} width={250} />
          )}
    </GridContainer>
  );
};

export default ListingLTRooms;
