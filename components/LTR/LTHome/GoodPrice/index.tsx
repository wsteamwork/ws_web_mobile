import CardRoom2 from '@/components/Cards/CardRoom2';
import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useContext, useEffect, useState } from 'react';
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

  const params = {
    spaceBetween: 10,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false
    }
  }

  const renderRoomsHot = (room) => (
    <CardRoom2
      city={room.city}
      district={room.district}
      priceDisplay={room.price_display}
      roomID={room.id}
      roomName={room.about_room.name}
      roomType={room.accommodation_type_txt}
      roomImage={room.avatar.images[0].name}
      avg_rating={room.avg_rating}
    />
  );
  return (
    <HorizontalScrollLayout
      headTitle={t('home:goodPrice')}
      listData={dataRooms}
      swiperParams={params}
      paddingLeft={4}
      paddingRight={4}
      itemRender={renderRoomsHot}
    />

  );
};

export default GoodPrice;
