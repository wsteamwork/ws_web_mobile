import CardRoom2 from '@/components/Cards/CardRoom2';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({}));

const GoodPrice: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);

  useEffect(() => {
    getHomePageCollection('good_price', 4).then((res) => setDataRooms(res));
  }, []);

  //   const roomsHot = useSelector<ReducersList, RoomIndexRes[]>(
  //     (state) => state.roomHomepage.roomsHot
  //   );
  const renderRoomsHot = (room) => (
    <CardRoom2
      city={room.city}
      district={room.district}
      // instantbook={room.instant_book}
      priceDisplay={room.price_display}
      roomID={room.id}
      roomName={room.about_room.name}
      roomType={room.accommodation_type_txt}
      roomImage={room.avatar.images[0].name}
      avg_rating={room.avg_rating}
    />
  );
  return (
    <Fragment>
      {/* <Grid container item xs={12} justify="center" className={classes.root}> */}
      <PropertyListHorizontalScroll
        itemWidth={width == 'xs' ? '90%' : width == 'sm' ? '80%' : width == 'md' ? '66.67%' : '66%'}
        headTitle={t('home:collectionRooms:goodPrice')}
        itemHeight={width == 'xs' ? 150 : width == 'sm' ? 220 : width == 'md' ? 220 : 200}
        gutter={6}
        listData={dataRooms}
        itemRender={renderRoomsHot}
        sizeIcon={width == 'sm' ? 100 : 65}
      />
      {/* </Grid> */}
    </Fragment>
  );
};

export default GoodPrice;
