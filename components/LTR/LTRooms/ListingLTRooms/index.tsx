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
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { formatPrice } from '@/utils/mixins';

interface IProps {
  classes?: any;
  pageChange?(current: number, pageSize: number): void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    titleList: {
      marginTop: 48,
      fontWeight: 600
    },
    marginBottom: {
      marginBottom: '16px'
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

  const imgRoom = (room) => {
    let img =
      room.avatar.images && room.avatar.images.length
        ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
        : './static/ms-icon-310x310.png';
    return img;
  };
  const priceRoom = (room) => {
    let price = room.price_display ? formatPrice(room.price_display) : t('rooms:contactForPrice');
    return price;
  };

  return (
    <Grid container item xs={12} justify="center">
      {longtermRooms.length && !isLoading ? (
        <Fragment>
          <Grid container item xs={12}>
            <LazyLoad>
              {longtermRooms.map((room, index) => {
                console.log(room);
                return (
                  <Grid item container xs={12} sm={6} key={index} className={classes.marginBottom}>
                    <RoomCardItem
                      roomImage={imgRoom(room)}
                      roomPrice={priceRoom(room)}
                      room_id={room.id}
                      roomName={room.about_room.name}
                      roomType={room.accommodation_type_txt}
                      district={room.district.data.name}
                      city={room.city.data.name}
                      number_bedroom={room.bedrooms.number_bedroom}
                      number_bathroom={room.bathrooms.number_bathroom}
                      total_area={room.total_area}
                      numberRoomSameBuilding={room.room_same_apartment_building}
                    />
                  </Grid>
                );
              })}
            </LazyLoad>
          </Grid>
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
