import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React, { FC, Fragment } from 'react';

interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  handleBlock: () => void,
  handleUnlock: () => void,
  startDate: string,
  endDate: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxTitle: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    root: {
      padding: '16px 24px',
      borderRadius: 16,
      minWidth: 400,
    },
    boxContent: {
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    boxAction: {
      justifyContent: 'space-around',
    },
    btnLock: {
      color: '#f44336',
      textTransform: 'inherit',
    },
    btnUnlock: {
      color: '#00c853',
      textTransform: 'inherit',
    }
  })
);

const DialogActionCalendar: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, handleBlock, handleUnlock, startDate, endDate } = props;

  const diffDay = moment(endDate).diff(startDate, 'days');

  return (
    <Fragment>
      <Dialog maxWidth={'sm'} onClose={handleClose} aria-labelledby="dialog-action-calendar" open={open} classes={{ paper: classes.root }}>
        <DialogTitle disableTypography className={classes.boxTitle}>
          <Typography variant="h6">Lựa chọn hành động</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className={classes.boxContent}>
          <Typography>
            Bạn đang chọn ngày <b> {startDate} </b>
            {diffDay ? (
              <span>đến ngày <b>{endDate}</b></span>
            ) : ''}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.boxAction}>
          <Button autoFocus onClick={handleBlock} className={classes.btnLock}>
            Khóa ngày
          </Button>
          <Button autoFocus onClick={handleUnlock} className={classes.btnUnlock}>
            Mở ngày
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogActionCalendar;
