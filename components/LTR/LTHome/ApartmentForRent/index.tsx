import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import ApartmentForRentCard from './ApartmentForRentCard';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24,
      marginTop: 18
    }
  })
);

const ApartmentForRent: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getHomePageCollection('apartment_for_rent', 5).then((res) => setDataRooms(res));
  }, []);

  const renderDestinations = (room: any) => <ApartmentForRentCard room={room} />;
  const params = {
    spaceBetween: 10,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false
    }
  }
  return (
    
    <HorizontalScrollLayout
      headTitle={t('home:collectionRooms:apartmentForRent')}
      listData={dataRooms}
      swiperParams={params}
      paddingLeft={4}
      paddingRight={4}
      itemRender={renderDestinations}
    />
  );
};

export default ApartmentForRent;
