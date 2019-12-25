import React, { Fragment, FC, useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Breadcrumbs, Link, Typography, Box, Fab } from '@material-ui/core';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { GlobalContext } from '@/store/Context/GlobalContext';
import RoomCardItem from '@/components/LTR/Merchant/Listing/RoomList/RoomCardItem';
import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import Pagination from "rc-pagination";
import { useTranslation } from 'react-i18next';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import Router from 'next/router';
import { updateObject } from '@/store/Context/utility';
import { scrollTop } from '@/components/LTR/Merchant/Listing/RoomList';
import { Dispatch } from 'redux';
import { RoomListReducerAction, getRoomList } from '@/store/Redux/Reducers/LTR/RoomList/roomlist';
import { axios_merchant } from '@/utils/axiosInstance';
import { ApartmentBuildingsRes } from 'types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import 'rc-pagination/assets/index.css';
import CreateIcon from '@material-ui/icons/CreateRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import DialogInfoBuildingAndAddRooms
  from '@/components/LTR/Merchant/Listing/BuildingList/DialogInfoBuildingAndAddRooms';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      marginTop: '24px'
    },
    custom_link_bread: {
      color: '#1d8df7'
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    btnAction:{
      margin:8,
      backgroundColor: '#2196f3',
      color: '#fff',
      '&:hover':{
        backgroundColor: '#1976d2'
      }
    }
  })
);

const BuildingDetail: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [cookies] = useCookies(['_token']);
  const error = useSelector<ReducersList, boolean>((state) => state.iProfile.error);
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const roomlist = useSelector<ReducersList, any[]>((state) => state.roomlist.roomlist);
  const meta = useSelector<ReducersList, any>((state) => state.roomlist.meta);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [buildingData, setBuildingData] = useState<ApartmentBuildingsRes>(null);
  const [openDialogAddRooms, setOpenDialogAddRooms] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<RoomListReducerAction>>();

  const idBuilding = router.query.building_id;

  const getBuilding = async (id) => {
    try {
      const res = await axios_merchant.get(`apartment-buildings/${id}`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getBuilding(idBuilding).then((res) => {
      setBuildingData(res.data);
    });
  }, []);

  useEffect(() => {
    !!error && router.push('/auth');
    !cookies._token && router.push('/auth');
  }, [error]);

  const changePage = (current: number) => {
    setCurrentPage(current);
    const query = {
      page: current
    };
    Router.push({
      pathname: `/host/building-list/${router.query.building_id}/building-detail`,
      query: updateObject<any>(Router.query, query)
    });
    scrollTop();
  };

  useEffect(() => {
    if (!roomlist.length) {
      getRoomList(dispatch);
    }
  }, [roomlist]);

  useEffect(() => {
    getRoomList(dispatch);
  }, [router.query]);

  const openUpdate  = (id) => {
    router.push(`/host/create-listing/${id}/apartment`);
  };

  return (
    <Fragment>
      <NavHeader_Merchant />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={11} md={10} lg={8} className={classes.marginLabel}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />}
            aria-label="breadcrumb">
            <Link href="/" className={classes.custom_link_bread}>
              {t('home:home')}
            </Link>
            <Link href="/host/building-list" className={classes.custom_link_bread}>
              {t('basic:buildingList')}
            </Link>
            <Typography color="textPrimary">{buildingData ? buildingData.name : '...'}</Typography>
          </Breadcrumbs>

          <Box mt = {3} >
            <Typography variant = 'h5' align = 'center'>
              {buildingData ? buildingData.name : '...'}
            </Typography>
          </Box>

          <Box my = {3} textAlign='right'>
            <Fab variant="extended" size='medium' className={classes.btnAction} onClick={()=>openUpdate(idBuilding)}>
              <CreateIcon className={classes.btnIcon} />
              {t('basic:editBuilding')}
            </Fab>
            <Fab variant="extended" size='medium' className={classes.btnAction} onClick={()=>setOpenDialogAddRooms(true)}>
              <HomeWorkRoundedIcon className={classes.btnIcon} />
              {t('basic:addRoomtoBuilding')}
            </Fab>
          </Box>
        </Grid>
      </Grid>

      {!!cookies._token ? (
        <Fragment>
          {roomlist.length ? (
            roomlist.map((o) => <RoomCardItem key={o.id} room={o} />)
          ) : (
            <NotFoundGlobal height={300} width={250} content={t('roomlist:contentNotFound')} />
          )}
          {meta && (
            <Pagination
              className="rooms-pagination"
              total={meta.pagination.total}
              locale={localeInfo}
              pageSize={meta.pagination.per_page}
              current={currentPage}
              onChange={changePage}
            />
          )}
        </Fragment>
      ) : ''}

      <DialogInfoBuildingAndAddRooms open={openDialogAddRooms} handleClose={()=>{setOpenDialogAddRooms(false)}} buildingID={idBuilding}/>
    </Fragment>
  );
};

export default BuildingDetail;
