import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { createStyles, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApartmentForRentCard from './ApartmentForRentCard';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 24,
      marginTop: 18
      // margin: '0 16px'
    }
    // roomItem: {
    //   padding: '6px !important'
    // }
  })
);

const ApartmentForRent: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);

  useEffect(() => {
    getHomePageCollection('apartment_for_rent', 5).then((res) => setDataRooms(res));
  }, []);

  const renderDestinations = (room: any) => <ApartmentForRentCard room={room} />;

  return (
    <Fragment>
      <Grid container justify="center" className={classes.root}>
        <PropertyListHorizontalScroll
          itemWidth={width == 'md' ? '66%' : width == 'sm' ? '80%' : '90%'}
          gutter={6}
          headTitle={t('home:collectionRooms:apartmentForRent')}
          listData={dataRooms}
          itemRender={renderDestinations}
        />

        {/* {dataRooms.length ? (
          <Fragment>
            <Grid>
              {dataRooms.map((room, index) => (
                <Grid key={index}></Grid>
              ))}
            </Grid>
          </Fragment>
        ) : (
          <Grid container spacing={2} className={classes.roomList}>
            {[1, 2, 3, 4].map((item, index) => (
              <Grid item container xs={6} key={index} className={classes.roomItem}>
                <Skeleton variant="rect" width="100%" height={220} />
                <Skeleton variant="text" width="100%" height={10} />
                <Skeleton variant="text" width="80%" height={10} />
                <Skeleton variant="text" width="30%" height={10} />
                <Skeleton variant="rect" width={210} height={118} />
              </Grid>
            ))}
          </Grid>
        )} */}

        {/* <ShowMoreHome top="0px" /> */}
      </Grid>
    </Fragment>
  );
};

export default ApartmentForRent;
