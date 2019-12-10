import mainColor from '@/styles/constants/colors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide, { SlideProps } from '@material-ui/core/Slide/Slide';
import { Theme, useTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, forwardRef, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapMobile from '../MapMobile';
import SwipeableViews from 'react-swipeable-views';
import { Typography, Box } from '@material-ui/core';
import LTHome from '@/pages/homepage/LTHome';
import SettingInApp from '@/components/SettingInApp';

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
      color: mainColor.primaryLT
    },
    marginBottom: {
      marginBottom: 5
    }
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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

interface IProps { }
const BottomNav: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [index, setIndex] = useState<number>(0);
  const theme = useTheme();

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <Fragment>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={index} index={0} dir={theme.direction}>
          <LTHome/>
        </TabPanel>
        <TabPanel value={index} index={1} dir={theme.direction}>
          <SettingInApp />
        </TabPanel>
        <TabPanel value={index} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>

      <BottomNavigation
        value={index}
        onChange={(event, newValue) => {
          setIndex(newValue);
        }}
        showLabels
        className={classes.root}>
        <BottomNavigationAction
          classes={{
            selected: classes.colorSelected
          }}
          className={classes.customColor}
          label={t('rooms:searchRooms:explore')}
          icon={
            <img className={classes.marginBottom} width="16" height="16" src="/static/images/search.svg" />
          }
        />
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected
          }}
          label={t('rooms:searchRooms:trips')}
          icon={
            <img
              className={classes.marginBottom}
              width="16"
              height="16"
              src='/static/images/Heart.svg'
            />
          }
        />
        <BottomNavigationAction
          className={classes.customColor}
          classes={{
            selected: classes.colorSelected
          }}
          label={t('rooms:searchRooms:profile')}
          icon={
            <img
              className={classes.marginBottom}
              width="16"
              height="16"
              src="/static/images/user.svg"
            />
          }
        />
      </BottomNavigation>
      <MapMobile openMap={index === MAP} />
    </Fragment>
  );
};

export default BottomNav;
