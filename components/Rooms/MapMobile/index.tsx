import { FILTER, TAB_LIST, TransitionCustom } from '@/components/Rooms/BottomNav';
import FilterDrawerMobile from '@/components/Rooms/FilterDrawerMobile';
import MapRoomListing from '@/components/Rooms/MapAndListing/MapRoomListing';
import { RoomIndexContext } from '@/store/Context/Room/RoomListContext';
import { Dialog, DialogContent, DialogTitle, Grid, Hidden, IconButton, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/FilterListRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any
  openMap?: boolean
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    closeButton: {
      [theme!.breakpoints!.down!('sm')]: {},
      position: 'absolute',
      top: '1%',
      right: '1%'
    },
    closeButtonRoot: {
      [theme!.breakpoints!.down!('sm')]: {
        position: 'absolute'
      }
    },
    label: {
      [theme!.breakpoints!.down!("sm")]: {
        textAlign: "center",
        backgroundColor: "#fff",
        width: "1.6em",
        height: "1.6em",
        boxShadow: '1px 5px 5px rgba(0, 0, 0, 0.15)',
        borderRadius: 4
      }
    },
    filterButton: {
      position: "absolute",
      top: "3.8%",
      [theme!.breakpoints!.down!("sm")]: {
        bottom: '5%',
        top: 'unset',
      },
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: 999
    },
    list: {
      [theme!.breakpoints!.up!('lg')]: {
        maxHeight: '83vh'
      },
      [theme!.breakpoints!.between!('sm', 'md')]: {
        maxHeight: '43vh',
        order: 1,
        marginTop: 10
      },
      [theme!.breakpoints!.down!('sm')]: {
        maxHeight: '47vh',
        order: 1,
        position: 'absolute',
        bottom: 5,
        zIndex: 100
      },
      overflow: 'auto'
    },
    mapContainer: {
      [theme!.breakpoints!.up!('lg')]: {
        minHeight: '82vh'
      },
      [theme!.breakpoints!.between!('sm', 'md')]: {
        minHeight: '46vh'
      },
      [theme!.breakpoints!.down!('sm')]: {
        minHeight: '100vh'
      }
    },
    dialogContent: {
      [theme!.breakpoints!.down!('sm')]: {
        padding: 0
      }
    },
    dialogTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme!.breakpoints!.down!('sm')]: {
        textAlign: 'center',
        position: 'absolute',
        zIndex: 9999,
        top: -3,
        left: 9
      }
    }
  })
);

const MapMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { openMap } = props;
  const [index, setIndex] = useState<number>(TAB_LIST);
  const { dispatch: mapDispatch } = useContext(RoomIndexContext);
  const { t } = useTranslation();

  const handleOpenFilter = () => {
    setIndex(FILTER);
  };

  const mapClose = () => {
    mapDispatch({
      type: 'setMapOpen',
      isMapOpen: false
    });
  };

  return (
    <Fragment>
      <Dialog fullScreen open={openMap} onClose={mapClose} TransitionComponent={TransitionCustom}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Hidden smDown>
            <Typography variant="h6">
              {t('rooms:map')}
            </Typography>
            {/*<MapFilter />*/}
          </Hidden>

          <IconButton
            className={classes.closeButton}
            onClick={mapClose}
            classes={{
              root: classes.closeButtonRoot,
              label: classes.label
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={0} style={{ height: '100%' }}>
            <div className='roomListing'>
              <MapRoomListing />
            </div>

            <Hidden mdUp implementation="css">
              <IconButton
                className={classes.filterButton}
                classes={{
                  root: classes.closeButtonRoot,
                  label: classes.label
                }}
                onClick={handleOpenFilter}>
                <FilterIcon />
              </IconButton>
              <Dialog
                fullScreen
                open={index === FILTER}
                TransitionComponent={TransitionCustom}
                scroll="paper"
                onClose={() => setIndex(TAB_LIST)}
              >
                <FilterDrawerMobile setIndex={setIndex} />
              </Dialog>
            </Hidden>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default MapMobile;
