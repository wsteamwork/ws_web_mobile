import BusinessTripCard from '@/components/LTR/LTHome/BusinessTripRooms/BusinessTripCard';
import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { GlobalContext, IGlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { getRoomSameBuilding, LTRoomReducerAction } from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import mainColor from '@/styles/constants/colors';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { Dispatch, FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.24,
      color: mainColor.titleText,
      fontWeight: 'bold'
    },
    title: {
      padding: '32px 28px 0',
      [theme.breakpoints.up('sm')]: {
        padding: '32px 38px 0'
      }
    }
  })
);

const BoxRoomSameBuilding: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const [dataRoomSameBuilding, setDataRoomSameBuilding] = useState([]);
  const { width } = useContext<IGlobalContext>(GlobalContext);
  useEffect(() => {
    if (ltroom.apartment_building_id)
      getRoomSameBuilding(ltroom.apartment_building_id).then((res) => {
        // console.log(res);
        dispatch({ type: 'setRoomSameBuilding', payload: res.data });
        setDataRoomSameBuilding(res.data);
      });
  }, [ltroom.apartment_building_id]);
  const renderRoomSameBuilding = (room) => {
    return (
      <BusinessTripCard
        room={room}
        lineClamp={2}
        imgHeight={width == 'xs' ? 150 : 100}
        isRoomSameBulding
      />
    );
  };

  return (
    <Fragment>
      <Grid className={classes.title}>
        <Typography variant="h5" className={classes.name} gutterBottom>
          {t('room:roomSameBuilding')}
        </Typography>
        {ltroom.apartment_building}
      </Grid>

      {dataRoomSameBuilding.length > 0 ? (
        <HorizontalScrollLayout
          listData={dataRoomSameBuilding}
          slidePerView={4.1}
          spaceBetween={16}
          margin={'16px 0'}
          paddingLeft={18}
          styleSmUp={{ slidesPerView: 4 }}
          itemRender={renderRoomSameBuilding}
        />
      ) : (
          <Fragment></Fragment>
        )}
    </Fragment>
  );
};

export default BoxRoomSameBuilding;
