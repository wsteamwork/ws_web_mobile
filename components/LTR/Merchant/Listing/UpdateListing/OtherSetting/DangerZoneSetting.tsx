import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { axios_merchant } from '@/utils/axiosInstance';
import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: 8
    },
    marginXs: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8
      }
    },
    name: {
      //   fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    buttonDelete: {
      color: '#EB465A',
      border: '#EB465A 1px solid'
    },
    cancelDelete: {
      color: '#95D2BA',
      border: '#95D2BA 1px solid'
    },
    container: {
      display: 'flex',
      border: '#EB465A 1px solid',
      padding: '16px 16px'
    },
    alertText: {
      marginBottom: 16
    },
    confirmError: {
      marginTop: 8,
      color: '#EB465A'
    }
  })
);

const DangerZoneSetting: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const [open, setOpen] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [confirmText, setConfirmText] = useState<string>('');

  function handleClose() {
    setOpen(false);
  }

  const handleChangeConfirmText = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmText(event.target.value);
  };

  const deleteRoomConfirmed = (roomId: number, confirmText) => {
    if (confirmText === 'XOAVINHVIEN') {
      axios_merchant.put(`long-term/room/delete-room/${roomId}`).then(res => {
        router.push(`/host/room-list`);
      })
    } else {
      setConfirmError(true);
    }
  }

  return (
    <Fragment>
      {listing ? (
        <Grid container className={classes.container}>
          <Grid item xs={9}>
            <Grid item xs={12} className={classes.margin}>
              <Typography variant="h6">
                Xoá bỏ căn hộ
              </Typography>
              <Typography variant="subtitle2" className={classes.name}>
                Hãy cẩn thận, một khi căn hộ đã bị xoá, bạn sẽ không thể khôi phục lại được
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined" color="secondary" className={classes.buttonDelete} onClick={() => setOpen(true)}>
              Xoá vĩnh viễn
            </Button>
          </Grid>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Bạn thật sự chắc chắn chứ?</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle2" className={classes.alertText}>
                Một khi bạn đã xoá, chúng tôi <b>không thể khôi phục</b> lại phòng này.
                Nếu bạn chắc chắn, hãy vui lòng nhập <b>XOAVINHVIEN</b> vào ô bên dưới để xác nhận
              </Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="confirmation"
                label=""
                onChange={handleChangeConfirmText}
                value={confirmText}
                fullWidth
              />
              {
                confirmError ?
                  <Typography variant="subtitle2" className={classes.confirmError}>
                    Thông tin nhập không chính xác, vui lòng kiểm tra lại
                  </Typography>
                  : ''
              }
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose} color="primary" className={classes.cancelDelete}>
                Đóng
              </Button>
              <Button variant="outlined" onClick={() => deleteRoomConfirmed(listing.room_id, confirmText)} color="primary" className={classes.buttonDelete}>
                Xoá phòng
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ) : (
          ''
        )}
    </Fragment>
  );
};
export default DangerZoneSetting;
