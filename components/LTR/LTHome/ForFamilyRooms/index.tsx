import React, { FC, useState, useEffect, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { GlobalContext } from '@/store/Context/GlobalContext';
import ShowMoreHome from '../ShowMoreHome';
import EditorChoiceCard from '../EditorChoiceRooms/EditorChoiceCard';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@fullcalendar/core';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    skeleton: {
      margin: '18px'
    },
    roomList: {
      margin: '0 10px'
    },
    roomItem: {
      padding: '6px !important'
    }
  })
);

const ForFamilyRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  useEffect(() => {
    getHomePageCollection('for_family').then((res) => setDataRooms(res));
  }, []);
  const renderForFamilyRoom = (room) => <EditorChoiceCard room={room} showDetail={true} />;
  return (
    <Fragment>
      {dataRooms.length ? (
        <PropertyListHorizontalScroll
          itemWidth={width == 'sm' ? '33.3%' : '66.7%'}
          gutter={6}
          headTitle={t('home:for_family')}
          listData={dataRooms}
          itemRender={renderForFamilyRoom}
        />
      ) : (
        <Fragment>
          <Grid container item xs={12} className={classes.skeleton}>
            <Skeleton variant="rect" width={150} height={30} />
          </Grid>
          <Grid container item xs={12} spacing={2} className={classes.roomList}>
            {[1, 2].map((item, index) => (
              <Grid item container xs={6} key={index} className={classes.roomItem}>
                <Skeleton variant="rect" width="100%" height={280} />
                <Skeleton variant="text" width="100%" height={8} />
                <Skeleton variant="text" width="80%" height={8} />
                <Skeleton variant="text" width="30%" height={8} />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      )}
      <ShowMoreHome top="-15px" />
    </Fragment>
  );
};

export default ForFamilyRooms;
