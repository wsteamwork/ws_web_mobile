import LongTermBookingList from '@/components/LTR/Merchant/Listing/BookingList/LongTermBookingList';
import ShortTermBookingList from '@/components/LTR/Merchant/Listing/BookingList/ShortTermBookingList';
import NavHeader_Merchant from '@/components/LTR/ReusableComponents/NavHeader_Merchant';
import { BookingListReducerAction } from '@/store/Redux/Reducers/LTR/BookingList/bookinglist';
import { AppBar, Box, Breadcrumbs, Grid, Link, Tab, Tabs, Theme, Typography, withStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

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
      fontSize: 20,
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
      <Box p={0} mt={3}>
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

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 16
    },
    custom_link_bread: {
      color: '#1d8df7'
    },
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
    }
  })
);
const BookingList: NextPage = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<BookingListReducerAction>>();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    dispatch({ type: 'SET_CURRENT_TAB', payload: newValue });
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
              {t('host:homepage')}
            </Link>
            <Typography color="textPrimary">{t('host:bookingList')}</Typography>
          </Breadcrumbs>
          <Grid className={classes.root}>
            <AppBar position="static" color="inherit" className={classes.wrapperTab}>
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
                variant="scrollable"
                scrollButtons="off">
                <AntTab label="Đặt phòng dài hạn" {...a11yProps(0)} />
                <AntTab label="Đặt phòng ngắn hạn" {...a11yProps(1)} />
              </AntTabs>
              <Typography className={classes.padding} />
            </AppBar>
            <TabPanel value={value} index={0}>
              <LongTermBookingList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ShortTermBookingList />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BookingList;
