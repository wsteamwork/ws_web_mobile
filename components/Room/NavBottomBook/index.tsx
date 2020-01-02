import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { AppBar } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import numeral from 'numeral';
import React, { FC, forwardRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BoxBooking from '../BoxBooking';

const Transition = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

const NavBottomBook: FC = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { width } = useContext(GlobalContext);

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  const { t } = useTranslation();

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Grid className="navBottomBook">
      <AppBar position="fixed" color="inherit" className="barSearch">
        <Toolbar className="toolBar">
          <GridContainer xs={12} sm={12} md={11} lg={10}>
            <Grid container spacing={0} className={'container'}>
              <Grid item xs={8} sm={9}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <div>
                      <span className={'price'}>
                        {t('room:currency')}{numeral(room.price_day).format('0,0')}{t('shared:dayPrice')}
                      </span>
                    </div>
                  </Grid>
                  {room!.rent_type != 2 && (
                    <Grid item xs={12} sm={4}>
                      <span className={'price'}>
                        {t('room:currency')}{numeral(room.price_hour).format('0,0')}{t('shared:hourPrice')}
                      </span>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={4} sm={3}>
                <ButtonGlobal padding="0px" width="100%" onClick={handleClick} className={'btBook'}>
                  {t('room:boxBooking:bookNow')}
                </ButtonGlobal>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>

      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        scroll="body"
        fullScreen={width === 'xs'}
        maxWidth="xs"
        open={openDialog}
        onClose={handleClick}>
        <DialogTitle className="navBottomBook__dialogTitle">
          <IconButton className={'button'} aria-label="Close" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="navBottomBook__dialogContent" style={{ height: '100%' }}>
          <BoxBooking />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default NavBottomBook;
