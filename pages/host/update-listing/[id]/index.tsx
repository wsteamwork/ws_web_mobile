import ListingDetails from '@/components/LTR/Merchant/Listing/UpdateListing/ListingDetails';
import ListingImage from '@/components/LTR/Merchant/Listing/UpdateListing/ListingImage';
import ListingPolicy from '@/components/LTR/Merchant/Listing/UpdateListing/ListingPolicy';
import ListingPrice from '@/components/LTR/Merchant/Listing/UpdateListing/ListingPrice';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { AmenitiesReducerAction, getDataAmenities } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import { getListingDetails, ListingDetailsReducerAction } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { UpdateDetailsActions } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { AppBar, Box, Breadcrumbs, createStyles, Grid, Tab, Tabs, Theme, withStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CalendarManagement from '@/components/LTR/Merchant/Listing/CalendarManagement';
interface IProps {
  classes?: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
interface StyledTabProps {
  label: string;
}
const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      padding: 0,
      fontWeight: theme.typography.fontWeightBold,
      marginRight: theme.spacing(6),
      fontSize: 16,
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightBold
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {
      color: '#1890ff'
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      style={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      <Box pt={3}>
        {children}
      </Box>
    </Typography>
  );
};

export const a11yProps = (index: any) => {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`
  };
};
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    marginLabel: {
      margin: '24px 0'
    },
    wrapperTab: {
      boxShadow: 'none'
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848',
      fontSize: 24
    },
    custom_link_bread: {
      color: '#1d8df7'
    }
  })
);

const UpdateListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const dispatch = useDispatch<Dispatch<ListingDetailsReducerAction>>();
  const dispatch_amen = useDispatch<Dispatch<AmenitiesReducerAction>>();

  const listing = useSelector<ReducersList, LTRoomIndexRes>(
    (state) => state.listingdetails.listing
  );
  useEffect(() => {
    if (!listing) {
      getListingDetails(id, dispatch);
    }
  }, []);
  useEffect(() => {
    getDataAmenities(id, dispatch_amen);
  }, []);
  useEffect(() => {
    if (localStorage.getItem('tabUpdate') && localStorage.getItem('currentRoom')) {
      if (localStorage.getItem('currentRoom') === id) {
        let tab = Number(localStorage.getItem('tabUpdate'));
        setValue(tab);
      } else {
        localStorage.setItem('currentRoom', String(id));
        setValue(0);
      }
    }
    else {
      localStorage.setItem('currentRoom', String(id));
      setValue(0);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    localStorage.setItem('tabUpdate', String(newValue));
  };
  return (
    <Fragment>
      <NavHeader_Merchant />
      {listing ? (
        <Grid container justify="center" alignContent="center">
          <Grid item xs={11} sm={10} md={8} lg={7} className={classes.marginLabel}>
            <Breadcrumbs
              separator={
                <NavigateNextIcon fontSize="small" className={classes.custom_link_bread} />
              }
              aria-label="breadcrumb">
              <Link href="/" className={classes.custom_link_bread}>
                Trang chủ
              </Link>
              <Link href="/host/room-list" className={classes.custom_link_bread}>
                Danh sách phòng
              </Link>
              <Typography color="textPrimary">Cập nhật phòng</Typography>
            </Breadcrumbs>
            <Grid container className={classes.marginLabel}>
              <Typography variant="subtitle1" className={classes.name}>
                {listing.about_room.name}
              </Typography>
            </Grid>
            <Grid className={classes.root}>
              <AppBar position="static" color="inherit" className={classes.wrapperTab}>
                <AntTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="ant example"
                  variant="scrollable"
                  scrollButtons="off">
                  <AntTab label="Chi tiết phòng" {...a11yProps(0)} />
                  <AntTab label="Ảnh phòng" {...a11yProps(1)} />
                  <AntTab label="Giá phòng" {...a11yProps(2)} />
                  <AntTab label="Chế độ đặt phòng" {...a11yProps(3)} />
                  <AntTab label="Lịch trống phòng" {...a11yProps(4)} />
                </AntTabs>
                <Typography className={classes.padding} />
              </AppBar>
              <TabPanel value={value} index={0}>
                <ListingDetails />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ListingImage />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ListingPrice />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ListingPolicy />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <CalendarManagement idRoom={listing.room_id} />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default UpdateListing;
