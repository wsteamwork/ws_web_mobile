import mainColor from '@/styles/constants/colors';
import { typeService } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';
import { detailPriceLT, LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney } from '@/utils/mixins';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Theme,
  Typography
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useState, Dispatch, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReducersList } from '@/store/Redux/Reducers';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRoomSameBuilding,
  LTRoomReducerAction
} from '@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer';
import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import BusinessTripCard from '@/components/LTR/LTHome/BusinessTripRooms/BusinessTripCard';

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
    }
  })
);

const BoxRoomSameBuilding: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const { t } = useTranslation();
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const [dataRoomSameBuilding, setDataRoomSameBuilding] = useState([]);
  useEffect(() => {
    getRoomSameBuilding(ltroom.apartment_building_id).then((res) => {
      dispatch({ type: 'setRoomSameBuilding', payload: res.data });
      setDataRoomSameBuilding(res.data);
    });
  }, []);
  console.log(dataRoomSameBuilding);
  const renderRoomSameBuilding = (room) => (
    <BusinessTripCard room={room} imgHeight={150} lineClamp={2} />
  );

  return (
    <Fragment>
      <Typography variant="h5" className={classes.name} gutterBottom>
        {t('room:roomSameBuilding')}
      </Typography>

      {dataRoomSameBuilding.length > 0 ? (
        <HorizontalScrollLayout
          // headTitle={t('home:for_family')}
          listData={dataRoomSameBuilding}
          slidePerView={3.1}
          spaceBetween={16}
          paddingLeft={18}
          itemRender={renderRoomSameBuilding}
        />
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default BoxRoomSameBuilding;
