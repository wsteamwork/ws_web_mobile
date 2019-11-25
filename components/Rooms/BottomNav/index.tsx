import mainColor from '@/styles/constants/colors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide, { SlideProps } from '@material-ui/core/Slide/Slide';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, forwardRef, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
      color: mainColor.primaryLT
    },
    marginBottom: {
      marginBottom: 5
    }
  })
);
export const FILTER = 0;
export const TAB_LIST = 1;
export const MAP = 2;
export const NAV = 3;

export const TransitionCustom = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide timeout={300} direction="up" ref={ref} {...props} />
));

interface IProps { }
const BottomNav: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [index, setIndex] = useState<number>(TAB_LIST);
  // const { state: stateRoomIndex, dispatch: mapDispatch } = useContext(RoomIndexContext);
  // const { isMapOpen } = stateRoomIndex;
  // useEffect(() => {
  //   if (index === MAP) {
  //     mapDispatch({
  //       type: 'setMapOpen',
  //       isMapOpen: true
  //     });
  //   }
  // }, [index]);
  // useEffect(() => {
  //   if (!isMapOpen) {
  //     setIndex(TAB_LIST);
  //   }
  // }, [isMapOpen]);
  return (
    <Fragment>
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
      {/* <Dialog
        fullScreen
        TransitionComponent={TransitionCustom}
        scroll="paper"
        open={index === FILTER}
        onClose={() => setIndex(TAB_LIST)}>
        <FilterDrawerMobile setIndex={setIndex} />
      </Dialog> */}
      <MapMobile openMap={index === MAP} />
    </Fragment>
  );
};

export default BottomNav;
