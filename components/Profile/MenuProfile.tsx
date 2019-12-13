import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { BottomNavigation, BottomNavigationAction, Grid, Hidden, Tab, Tabs } from '@material-ui/core';
import { BookmarksOutlined, NotificationImportantOutlined, PersonOutlined, PersonOutlineRounded } from '@material-ui/icons';
import Link from 'next/link';
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GridContainer from '../Layout/Grid/Container';
import NotificationPanel from '../Notifications/NotificationPanel';
import Account from './Account';
import BookingProfile from './BookingProfile';
import EditProfile from './EditProfile';
import BottomNav from '../Rooms/BottomNav';

const MenuProfile: FC = (props) => {
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const [value, setValue] = useState<number>(0);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    // if (parseInt(value == 2)) {
    //   Router.push('/long-term-bookings')
    // }
    setValue(value);
  };

  return (
    <GridContainer xs={11} lg={8} className={'menuProfile'}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={3} className="tabProfilePc"> */}
        {/* <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            variant={width == 'xs' ? 'scrollable' : 'fullWidth'}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="off">
            <Tab
              label={t('profile:notifications')}
              className={'sideNavItemText'}
              icon={<NotificationImportantOutlined />}></Tab>
            <Tab
              label={t('profile:userProfile')}
              className="sideNavItemText"
              icon={<PersonOutlineRounded />}></Tab>
            <Tab
              label={t('profile:account:title')}
              className="sideNavItemText"
              icon={<PersonOutlineRounded />}></Tab>
            <Tab
              label={t('profile:myBooking')}
              className={'sideNavItemText'}
              icon={<BookmarksOutlined />}></Tab>
          </Tabs> */}

        {/* <Link href={`/user/${profile.id}`}>
            <a className={'viewProfileLink viewProfileTab flex_rowCenter'}>
              {t('profile:watchInfo')}
            </a>
          </Link> */}
        {/* </Grid> */}
        {/* <Hidden lgUp implementation="css">
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={'NaviBottom'}>
            <BottomNavigationAction
              label={t('profile:notifications')}
              value={0}
              icon={<NotificationImportantOutlined />}
            />
            <BottomNavigationAction
              label={t('profile:userProfile')}
              value={1}
              icon={<PersonOutlined />}
            />
            <BottomNavigationAction
              label={t('profile:myBooking')}
              value={2}
              icon={<BookmarksOutlined />}
            />
          </BottomNavigation>
        </Hidden> */}

        <Grid item xs={12} md={9}>
          {/* {value === 0 && <NotificationPanel />} */}
          {/* {value === 1 && <EditProfile />} */}
          <EditProfile />
          {/* {value === 2 && <BookingProfile />} */}
          {/* {value === 3 && <Account />} */}
        </Grid>
        <BottomNav />
      </Grid>
    </GridContainer>
  );
};

export default MenuProfile;
