import GridContainer from '@/components/Layout/Grid/Container';
import SideDrawer from '@/components/Toolbar/SideDrawer';
import { GlobalContext } from '@/store/Context/GlobalContext';
import mainColor from '@/styles/constants/colors';
import { SwipeableDrawer } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide, { SlideProps } from '@material-ui/core/Slide/Slide';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, forwardRef, Fragment, useContext, useState } from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
// import SwipeableViews from 'react-swipeable-views';
import MapMobile from '../MapMobile';
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      height: 60,
      zIndex: 1
    },
    customColor: {
      color: '#8A8A8F'
    },
    colorSelected: {
      fontSize: '0.75rem !important',
      color: mainColor.primaryLT
    },
    labelBottom: {
      fontSize: '0.75rem'
    },
    marginBottom: {
      marginBottom: 5
    },
    drawer: {
      [theme.breakpoints.only('xs')]: {
        width: '80%'
      },
      width: '60%'
    },
  })
);
export const FILTER = 4;
export const TAB_LIST = 5;
export const MAP = 6;
export const NAV = 7;

export const TransitionCustom = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide timeout={300} direction="up" ref={ref} {...props} />
));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}>
//       {value === index && <div>{children}</div>}
//     </Typography>
//   );
// }

interface IProps {
  inBookingLT?: boolean;
  cookies: Cookies;
}
const BottomNav: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { cookies } = props;
  const [index, setIndex] = useState<number>(0);
  const { router } = useContext(GlobalContext);
  const isLogin = !!cookies.get('_token');
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if ((parseInt(newValue) == 1 || parseInt(newValue) == 2) && !isLogin) {
      router.push('/auth');
    } else if (parseInt(newValue) == 1 && isLogin) {
      setIndex(parseInt(newValue));
      router.push('/profile');
    } else if (parseInt(newValue) == 2 && isLogin) {
      setIndex(parseInt(newValue));
      router.push('/profile/long-term-bookings');
    }
    if (parseInt(newValue) == 3) {
      setIndex(parseInt(newValue));
      setOpenDrawer(true);
    }
    if (parseInt(newValue) == 0) {
      setIndex(parseInt(newValue));
      router.push('/');
    }
  };

  return (
    <Fragment>

      <BottomNavigation value={index} onChange={handleChange} showLabels className={classes.root}>
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected,
            label: classes.labelBottom
          }}
          label={t('shared:home')}
          icon={
            <img
              className={classes.marginBottom}
              width="22"
              height="22"
              src="/static/images/home.svg"
            />
          }
        />
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected,
            label: classes.labelBottom
          }}
          label={t('shared:profile')}
          icon={
            <img
              className={classes.marginBottom}
              width="22"
              height="22"
              src="/static/images/user.svg"
            />
          }
        />
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected,
            label: classes.labelBottom
          }}
          label={t('shared:booking')}
          icon={
            <img
              className={classes.marginBottom}
              width="22"
              height="22"
              src="/static/images/suitcase.svg"
            />
          }
        />
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected,
            label: classes.labelBottom
          }}
          label={t('shared:setting')}
          icon={
            <img
              className={classes.marginBottom}
              width="22"
              height="22"
              src="/static/images/settings.svg"
            />
          }
        />
      </BottomNavigation>

      <MapMobile openMap={index === MAP} />
      <GridContainer xs={12}>
        <SwipeableDrawer
          disableSwipeToOpen
          open={openDrawer}
          onOpen={() => setOpenDrawer(true)}
          onClose={() => setOpenDrawer(false)}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          classes={{
            paper: classes.drawer
          }}>
          <SideDrawer setOpen={setOpenDrawer} />
        </SwipeableDrawer>
      </GridContainer>
    </Fragment>
  );
};
export default withCookies(BottomNav);
