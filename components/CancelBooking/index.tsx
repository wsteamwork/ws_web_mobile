import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { CancelReasonList } from '@/store/Redux/Reducers/Profile/profile';
import { BookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { ReasonCancelReq } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { axios } from '@/utils/axiosInstance';
import { FormControl, Grid, MenuItem, OutlinedInput, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import _ from 'lodash';
import React, { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ButtonGlobal from '../ButtonGlobal';
import GridContainer from '../Layout/Grid/Container';
import CardBooking from '../Profile/CardBooking';
import MySnackbarContentWrapper from '../Profile/EditProfile/MySnackbarContentWrapper';

const CancelBooking: FC = (props) => {
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const infoBooking = useSelector<ReducersList, BookingIndexRes>(
    (state) => state.iProfile.bookingById
  );
  const reasonList = useSelector<ReducersList, CancelReasonList[]>(
    (state) => state.iProfile.typeCancel
  );
  const [idReason, setIdReason] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setIdReason(parseInt(event.target.value));
  };

  const itemsReason = _.map(reasonList, (o, i) => {
    return (
      <MenuItem key={i} value={o.id}>
        {o.value}
      </MenuItem>
    );
  });

  const handleSubmit = async () => {
    const id = router.query.id;
    const data: ReasonCancelReq = {
      note: comment,
      code: idReason
    };

    try {
      const res = await axios.post(`bookings/cancel-booking/${id}`, data);
      setOpen(true);
      setTimeout(() => {
        alert(t('shared:cancelBook:returnHome'));
        router.push('/');
      }, 1000);
    } catch (error) { }
  };

  return (
    <Fragment>
      {infoBooking ? (
        <GridContainer xs={11}>
          <Grid spacing={3} container justify="center" alignContent="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                {t('shared:cancelBook:cancel')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={7} className="dialogBookingDetails">
              <CardBooking dataBooking={infoBooking}></CardBooking>
            </Grid>

            <Grid item xs={12} sm={12} md={5} className="cancelBooking">
              <Paper elevation={0} className={'boxReason'}>
                <form onSubmit={handleSubmit}>
                  <Typography variant="h6">{t('shared:cancelBook:reason')}</Typography>
                  <Paper square elevation={0} className={'PaperDatePick'}>
                    <FormControl
                      variant="outlined"
                      className={'formControl'}
                      disabled={infoBooking.status === 5}>
                      <Select
                        MenuProps={{
                          classes: { paper: 'menuSelect' }
                        }}
                        displayEmpty
                        value={
                          infoBooking.status === 5 ? infoBooking.cancel.data[0].code : idReason
                        }
                        onChange={handleChangeSelect}
                        input={
                          <OutlinedInput
                            notched={false}
                            labelWidth={0}
                            name="time"
                            id="outlined-time-simple"
                            classes={{ notchedOutline: 'inputOutline' }}
                          />
                        }>
                        {itemsReason}
                      </Select>
                    </FormControl>
                  </Paper>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ margin: '10px 0 0' }}>
                    {t('shared:cancelBook:desc1')}
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label={t('shared:cancelBook:reason')}
                    multiline
                    required={idReason === 2}
                    disabled={infoBooking.status === 5}
                    rows="6"
                    rowsMax="6"
                    fullWidth
                    defaultValue={infoBooking.status === 5 ? infoBooking.cancel.data[0].note : ''}
                    onChange={(e) => setComment(e.target.value)}
                    className={'textField'}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: infoBooking.status === 5
                    }}
                  />
                  <Typography variant="subtitle2" color="textSecondary">
                    {t('shared:cancelBook:desc2')}
                  </Typography>
                  <div style={{ textAlign: 'center' }}>
                    {infoBooking.status === 5 ? (
                      <ButtonGlobal
                        variant="contained"
                        disabled={true}
                        color="secondary"
                        className={'buttonSubmit'}>
                        {t('shared:cancelBook:canceled')}
                      </ButtonGlobal>
                    ) : (
                        <ButtonGlobal
                          className={'buttonSubmit'}
                          variant="contained"
                          disabled={idReason === 0}
                          type="submit">
                          {t('shared:cancelBook:conf')}
                        </ButtonGlobal>
                      )}
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </GridContainer>
      ) : (
          <SimpleLoader />
        )}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <MySnackbarContentWrapper
          variant="success"
          message={t('shared:cancelBook:success')}
          onClose={handleClose}></MySnackbarContentWrapper>
      </Snackbar>
    </Fragment>
  );
};

export default CancelBooking;
