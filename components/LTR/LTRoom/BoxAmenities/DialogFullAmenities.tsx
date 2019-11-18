import { TransitionCustom } from '@/components/Rooms/BottomNav';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { AmenitiesIndexRes } from '@/types/Requests/LTR/Amenities/AmenitiesResponses';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  facilities?: AmenitiesIndexRes[],
  bedrooms?: AmenitiesIndexRes[],
  kitchens?: AmenitiesIndexRes[],
  bathrooms?: AmenitiesIndexRes[],
  common?: AmenitiesIndexRes[],
  livingrooms?: AmenitiesIndexRes[],
  others?: AmenitiesIndexRes[],
  entertainment?: AmenitiesIndexRes[],
  outdoors?: AmenitiesIndexRes[],
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme!.breakpoints!.only!('xs')]: {
        padding: 0
      }
    },
    dialogTitle: {
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      backgroundColor: '#fff'
    },
    closeButton: {
      marginRight: 16,
      padding: 8,
    },
    closeButtonRoot: {

    },
    title: {
      fontWeight: 700,
    },
    roomName: {
      margin: '40px 0 12px',
      fontWeight: 700,
      color: '#323232'
    },
    nameIcon: {
      display: 'flex',
      alignItems: 'center',
      color: '#323232'
    },
    roomAmenitiesIcon: {
      verticalAlign: 'bottom',
      width: 24,
      height: 24
    },
  })
);

const DialogFullAmenities: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, facilities, bedrooms, kitchens, bathrooms, livingrooms, common, entertainment, others, outdoors } = props;
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();

  return (
    <Dialog scroll='body' fullWidth fullScreen={width === 'xs'}
      aria-labelledby="scroll-dialog-title" open={open} onClose={handleClose} TransitionComponent={TransitionCustom}>
      <DialogTitle id="scroll-dialog-title" disableTypography className={classes.dialogTitle}>
        <IconButton
          className={classes.closeButton}
          onClick={handleClose}
          classes={{
            root: classes.closeButtonRoot
          }}>
          <CloseIcon style={{ fontSize: '2rem' }} />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          {t('longtermroom:amenitiesOfRoom')}
        </Typography>
      </DialogTitle>

      <DialogContent >
        {facilities === undefined || facilities.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:facilities')}
              </Typography>

              <Grid container spacing={2}>
                {facilities.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {livingrooms === undefined || livingrooms.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:livingrooms')}
              </Typography>

              <Grid container spacing={2}>
                {livingrooms.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {bedrooms === undefined || bedrooms.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:bedrooms')}
              </Typography>

              <Grid container spacing={2}>
                {bedrooms.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {bathrooms === undefined || bathrooms.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:bathrooms')}
              </Typography>

              <Grid container spacing={2}>
                {bathrooms.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {kitchens === undefined || kitchens.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:kitchens')}
              </Typography>

              <Grid container spacing={2}>
                {kitchens.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {entertainment === undefined || entertainment.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:entertainment')}
              </Typography>

              <Grid container spacing={2}>
                {entertainment.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {outdoors === undefined || outdoors.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:outdoors')}
              </Typography>

              <Grid container spacing={2}>
                {outdoors.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {common === undefined || common.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:common')}
              </Typography>

              <Grid container spacing={2}>
                {common.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}

        {others === undefined || others.length === 0 ? (
          <Fragment />
        ) : (
            <div>
              <Typography variant='subtitle1' className={classes.roomName}>
                {t('shared:others')}
              </Typography>

              <Grid container spacing={2}>
                {others.map((o, i) => (
                  <Fragment key={i}>
                    <Grid item container xs={6} sm={4} spacing={2}>
                      <Grid item >
                        <img
                          src={o.icon}
                          alt={o.type_txt}
                          className={classes.roomAmenitiesIcon}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs>
                        <Typography variant={'body2'}>{o.comfort_trans[0].name}</Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogFullAmenities;
