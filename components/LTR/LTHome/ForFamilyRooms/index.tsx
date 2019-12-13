import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { Theme } from '@fullcalendar/core';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditorChoiceCard from '../EditorChoiceRooms/EditorChoiceCard';
import ShowMoreHome from '../ShowMoreHome';
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
        <HorizontalScrollLayout
          headTitle={t('home:for_family')}
          listData={dataRooms}
          slidePerView={2.1}
          spaceBetween={10}
          paddingLeft={18}
          itemRender={renderForFamilyRoom}
        />
      ) : (
          <Fragment>
            <Grid container item xs={12} className={classes.skeleton}>
              <Skeleton variant="text" width={150} height={30} />
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
