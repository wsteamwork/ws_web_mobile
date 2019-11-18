import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { getDataImages, ImageReducerAction, ImageReducerState } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { Button, Dialog, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid/Grid';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardImageCaption from '../../CreateListing/UploadImage/CardImageCaption';
import UppyImage from '../../CreateListing/UploadImage/UppyImage';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps { }
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

const UpdateLivingRoomImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();
  const { room_id, livingrooms } = useSelector<ReducersList, ImageReducerState>(
    (state) => state.images
  );
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = (e: MouseEvent<HTMLElement>) => {
    setOpenDialog(false);
  };
  const handleClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  const UpdateLivingImage: any = () => {
    const res = handleUpdateListing(room_id, {
      livingrooms: livingrooms
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật ảnh phòng khách thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật ảnh phòng khách thất bại !');
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate
        handleSave={UpdateLivingImage}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        {livingrooms.images.length ? (
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
                    <UppyImage
                      label={t('details:images:labelLivingRooms')}
                      subLabel={t('details:images:subLabelLivingRooms')}
                      typeUpload={{ type: 'setLivingRoomImage' }}
                      typeImage={7}
                      initImages={livingrooms.images.length ? livingrooms.images : []}
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
                Thêm ảnh
              </Button>
              <CardImageCaption
                onUpdateImage={true}
                label={t('details:images:labelLivingRooms')}
                subLabel="Thêm chú thích cho ảnh"
                typeUpload={{ type: 'setLivingRoomImage' }}
                typeImage={7}
                arrImage={livingrooms.images}
              />
            </Grid>
          </Fragment>
        ) : (
            ''
          )}
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateLivingRoomImage;
