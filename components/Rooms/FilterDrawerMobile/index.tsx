import React, { FC, Fragment, useState, useContext, forwardRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TAB_LIST } from '@/components/Rooms/BottomNav';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import PriceRangeMobile from './PriceRangeMobile/index';
import AmentitesMobile from './AmentitesMobile/index';
import DistrictsMobile from './DistrictsMobile/index';
import BookingTypeMobile from './BookingTypeMobile/index';
import InstantBookMobile from './InstantBookMobile/index';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import { updateObject } from '@/store/Context/utility';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { useTranslation } from 'react-i18next';
import { Divider, Dialog } from '@material-ui/core';
import mainColor from '@/styles/constants/colors';
import RoomTypeMobile from './RoomTypeMobile';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import { GlobalContext } from '@/store/Context/GlobalContext';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    center: {
      textAlign: 'center',
      fontWeight: 600
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    dialog: {
      [theme!.breakpoints!.only!('xs')]: {
        padding: '0 20px'
      }
    },
    title: {
      fontWeight: 700,
      color: '#8A8A8F'
    },
    titleRoomType: {
      fontWeight: 700,
      color: '#8A8A8F',
      marginBottom: 16
    },
    titlePrice: {
      color: '#8A8A8F',
      fontWeight: 700,
      marginBottom: 13
    },
    inline: {
      display: 'flex',
      alignItems: 'center'
    },
    itemRight: {
      alignItems: 'flex-end',
      textAlign: 'right'
    },
    apply: {
      width: '100%',
      border: ' 1px solid',
      borderColor: mainColor.primary,
      borderRadius: 25,
      color: '#ffffff',
      height: 46,
      margin: 20,
      boxShadow: '0px 12px 22px rgba(0, 0, 0, 0.0968914)'
    },
    applyLT: {
      width: '100%',
      backgroundColor: mainColor.primaryLT,
      border: ' 1px solid',
      color: '#ffffff',
      borderColor: mainColor.primaryLT,
      borderRadius: 25,
      height: 46,
      margin: 20,
      boxShadow: '0px 12px 22px rgba(0, 0, 0, 0.0968914)'
    },
    divider: {
      margin: '24px 0',
      backgroundColor: '#D8D8D8',
      width: '100%'
    }
  })
);
interface IProps {
  classes?: any;
  setIndex?: () => void;
}
const FilterDrawerMobile: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { setIndex } = props;
  const { state, dispatch } = useContext(RoomFilterContext);
  const { router } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const { price_day_from, price_day_to, instant_book } = state;
  const booking_type = useSelector<ReducersList, number>((state) => state.searchFilter.bookingType);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const leaseTypePathName = useSelector<ReducersList, string>(
    (state) => state.searchFilter.leaseTypePathName
  );

  const queryTypeRoom = leaseTypeGlobal ? router.query.accommodation_type : router.query.type_room;
  const queryAmenities = leaseTypeGlobal ? router.query.comfort_lists : router.query.amenities;
  const queryDistricts = leaseTypeGlobal ? router.query.district_id : router.query.districts;
  const convertParams = (params: string) => {
    if (params) {
      return params.split(',').map((i) => parseInt(i, 10));
    } else {
      return [];
    }
  };
  const roomTypeInit = convertParams(queryTypeRoom as string);
  const amenitiesInit = convertParams(queryAmenities as string);
  const districtInit = convertParams(queryDistricts as string);
  const [dataRoomType, setDataRoomType] = useState<number[]>(roomTypeInit);
  const [dataAmentites, setDataAmentites] = useState<number[]>(amenitiesInit);
  const [dataDistricts, setDataDistricts] = useState<number[]>(districtInit);
  const TransitionCustom = forwardRef<HTMLElement, SlideProps>((props, ref) => (
    <Slide timeout={300} direction="up" ref={ref} {...props} />
  ));
  const filterRoomType = () => {
    dispatch({ type: 'setRoomTypes', roomTypes: dataRoomType });
  };
  const filterAmentites = () => {
    dispatch({ type: 'setAmenitiesFilter', amenities: dataAmentites });
  };
  const filterDistricts = () => {
    dispatch({ type: 'setDistrictsFilter', districts: dataDistricts });
  };

  const query = {
    type_room: dataRoomType.join(','),
    amenities: dataAmentites.join(','),
    districts: dataDistricts.join(','),
    rent_type: booking_type,
    instant_book: instant_book,
    price_day_from: price_day_from,
    price_day_to: price_day_to
  };

  const queryLT = {
    accommodation_type: dataRoomType.join(','),
    comfort_lists: dataAmentites.join(','),
    district_id: dataDistricts.join(','),
    instant_book: instant_book,
    min_price: price_day_from,
    max_price: price_day_to
  };

  const applyFilter = () => {
    setIndex();
    filterRoomType();
    filterAmentites();
    filterDistricts();

    router.push({
      pathname: leaseTypePathName,
      query: updateObject<any>(router.query, leaseTypeGlobal ? queryLT : query)
    });
  };

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <Typography variant="h6" className={classes.center}>
          {t('rooms:filterRooms:filters')}
        </Typography>
        <IconButton className={classes.closeButton} onClick={() => setIndex()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid item xs={12} container className={classes.sortMargin} spacing={0}>
          <Grid item xs={12} className={classes.sortMargin}>
            <Typography variant="subtitle2" className={classes.titlePrice}>
              {t('rooms:filterRooms:priceRange')}
            </Typography>
            <PriceRangeMobile />
            <Divider className={classes.divider} />
          </Grid>
          {leaseTypeGlobal ? (
            ''
          ) : (
            <Grid container item xs={12}>
              <Grid item xs={6} className={classes.inline}>
                <Typography variant="subtitle2" className={classes.title}>
                  {t('rooms:filterRooms:bookByHour')}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.itemRight}>
                <BookingTypeMobile />
              </Grid>
              <Grid container item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
          )}
          <Grid container item xs={12}>
            <Grid item xs={6} className={classes.inline}>
              <Typography variant="subtitle2" className={classes.title}>
                {t('rooms:filterRooms:instantBook')}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.itemRight}>
              <InstantBookMobile />
            </Grid>
            <Grid container item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.sortMargin}>
            <Typography variant="subtitle2" className={classes.titleRoomType}>
              {t('rooms:filterRooms:roomsType')}
            </Typography>
            <RoomTypeMobile dataClick={dataRoomType} setDataClick={setDataRoomType} setOpen={setOpen}/>
            <Grid container item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.sortMargin}>
            <Typography variant="subtitle2" className={classes.title}>
              {t('rooms:filterRooms:districtsFilter')}
            </Typography>
            <DistrictsMobile dataClick={dataDistricts} setDataClick={setDataDistricts} setOpen={setOpen}/>
            <Grid container item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.sortMargin}>
            <AmentitesMobile dataClick={dataAmentites} setDataClick={setDataAmentites} setOpen={setOpen}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {leaseTypeGlobal ? (
          <Button
            variant="contained"
            onClick={applyFilter}
            classes={{
              root: classes.applyLT
            }}>
            {t('rooms:filterRooms:apply')}
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={applyFilter}
            classes={{
              root: classes.apply
            }}>
            {t('rooms:filterRooms:apply')}
          </Button>
        )}
      </DialogActions>
    </Fragment>
  );
};

export default FilterDrawerMobile;
