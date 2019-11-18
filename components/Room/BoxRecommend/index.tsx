import ListRoom from '@/components/ListRoom';
import RoomCard from '@/components/RoomCard';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 700,
    }
  })
);

const BoxRecommend: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const roomRecommend = useSelector<ReducersList, RoomIndexRes[]>((state) => state.roomPage.roomRecommend);

  const renderRoom = (room) => <RoomCard isHomepage={false} isFormatPrice={true}
    city={room.city.data.name}
    district={room.district.data.name}
    instantbook={room.instant_book}
    roomID={room.id}
    roomName={room.room.details.data[0].name}
    roomNumber={room.number_room}
    roomType={room.room_type_txt}
    roomImage={room.media.data[0].image}
    price_day={room.price_day}
    price_hour={room.price_hour}
    total_review={room.total_review}
    avg_rating={room.avg_rating}
  />;

  return (
    <Fragment>
      {/*<Typography variant="h5" gutterBottom className={classes.title}>*/}
      {/*  {t('room:recommend')}*/}
      {/*</Typography>*/}
      <ListRoom roomData={roomRecommend}
        usingSlider={true}
        title={t('room:recommend')}
        render={renderRoom} />
    </Fragment>
  );
};

export default BoxRecommend;
