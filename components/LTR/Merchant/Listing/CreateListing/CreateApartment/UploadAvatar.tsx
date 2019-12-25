import { ReducersList } from '@/store/Redux/Reducers';
import { Button, Dialog, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid/Grid';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AvatarUppyApartment from './AvatarUppyApartment';
import { CreateApartmentState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateApartment';
import ShowInitImage from './ShowInitImage';
interface IProps {}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapperBtn: {
      position: 'relative'
    },
    button: {
      position: 'absolute',
      right: 0,
      top: 5,
      color: '#1d8df7',
      textTransform: 'initial',
      backgroundColor: '#ffffff',
      border: '1px solid #1d8df7',
      '&:hover': {
        color: '#1d8df7',
        backgroundColor: '#ffffff',
        border: '1px solid #1d8df7'
      }
    },
    buttonClose: {
      position: 'absolute',
      right: 0,
      bottom: -15,
      color: '#1d8df7',
      textTransform: 'initial',
      backgroundColor: '#ffffff',
      border: '1px solid #1d8df7',
      '&:hover': {
        color: '#1d8df7',
        backgroundColor: '#ffffff',
        border: '1px solid #1d8df7'
      }
    }
  })
);

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}))(MuiDialogContent);

const UploadAvatar: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { avatar } = useSelector<ReducersList, CreateApartmentState>(
    (state) => state.createApartment
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = (e: MouseEvent<HTMLElement>) => {
    setOpenDialog(false);
  };
  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <Fragment>
      <Fragment>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12}>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              className={classes.dialog}
              fullScreen={fullScreen}
              aria-labelledby="responsive-dialog-title">
              <DialogContent dividers>
                <AvatarUppyApartment
                  label={t('host:imageAvatar')}
                  subLabel={t('details:images:subLabelCover')}
                  height={350}
                  maxImage={2}
                  initImg={avatar}
                />
                <Grid item xs={12} className={classes.wrapperBtn}>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.buttonClose}>
                    Đóng
                  </Button>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.wrapperBtn}>
          <Button
            onClick={handleClick}
            size="small"
            variant="outlined"
            color="primary"
            className={classes.button}>
            {avatar.length ? t('host:changeAvatar') : t('host:addAvatar')}
          </Button>
          <ShowInitImage
            reload={openDialog}
            label={t('host:imageAvatar')}
            subLabel={t('host:subTitleAvatar')}
            img={avatar}
          />
        </Grid>
      </Fragment>
    </Fragment>
  );
};

export default UploadAvatar;
