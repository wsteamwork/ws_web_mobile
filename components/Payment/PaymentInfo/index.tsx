import React, { Fragment, useContext, useState, FC } from 'react';
import {
  Paper,
  Typography,
  Divider,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import moment from 'moment';
import { formatMoney } from '@/utils/mixins';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { ExpandMore } from '@material-ui/icons';
import InfoHeader from './InfoHeader';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { useTranslation } from 'react-i18next';

const PaymentInfo: FC = (props) => {
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const xsMode = width === 'xs';
  const [infoStatus, setInfoStatus] = useState<boolean>(!xsMode);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.dataInvoice.room.data);
  const lists = useSelector<ReducersList, PaymentBankListRes>((state) => state.book.dataInvoice);

  let checkInDate = lists ? moment(lists!.checkin) : moment();
  let checkOutDate = lists ? moment(lists!.checkout) : moment();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={'paymentInfo'}>
          <Grid container spacing={2}>
            {room ? (
              <Fragment>
                <InfoHeader room={room} />
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        {t('payment:invoice:checkinDate')}
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {checkInDate.format(DEFAULT_DATE_TIME_FORMAT)}
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        {t('payment:invoice:checkoutDate')}
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {checkOutDate.format(DEFAULT_DATE_TIME_FORMAT)}
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        {t('payment:invoice:guestUpper')}
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        {lists!.number_of_guests} {t('payment:invoice:guest')}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider className={'spaceTop'} />
                  <Grid container spacing={2} className={'spaceTop'}>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        {t('payment:invoice:price')}
                      </Grid>
                      <Grid
                        container
                        item
                        xs={6}
                        className={'fontLow'}
                        justify="flex-end">{`${formatMoney(lists!.price_original)}đ`}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        {t('payment:invoice:feeService')}
                      </Grid>
                      <Grid
                        container
                        item
                        xs={6}
                        className={'fontLow'}
                        justify="flex-end">{`${formatMoney(lists!.additional_fee)}đ`}</Grid>
                    </Grid>
                    {lists!.coupon && (
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLow'}>
                          {t('payment:invoice:promotionCode')} ({lists!.coupon})
                        </Grid>
                        <Grid
                          container
                          item
                          xs={6}
                          className={'fontLow'}
                          justify="flex-end">{`${formatMoney(lists!.coupon_discount)}đ`}</Grid>
                      </Grid>
                    )}

                    {lists!.price_discount > 0 && (
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLow'}>
                          {t('payment:invoice:sale')}
                        </Grid>
                        <Grid
                          container
                          item
                          xs={6}
                          className={'fontLow'}
                          justify="flex-end">{`${formatMoney(lists!.price_discount)}đ`}</Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Divider className={'spaceTop'} />
                  <Grid container spacing={2} className={'spaceTop'}>
                    <Grid container item xs={12}>
                      <Grid item xs={6} className={'fontLow'}>
                        <Typography variant="h6">{t('payment:invoice:total')}</Typography>
                      </Grid>
                      <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                        <Typography variant="h6">{`${formatMoney(lists!.total_fee)}đ`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            ) : (
              <SimpleLoader />
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={'paymentInfo'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ExpansionPanel elevation={0} defaultExpanded={!xsMode}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  className="noPadding"
                  classes={{
                    content: 'alignCenter'
                  }}>
                  <Typography className={'typo'}>{t('payment:invoice:customInfo')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={'details noPadding'}>
                  {room && lists ? (
                    <Grid container spacing={2}>
                      {infoStatus && (
                        <Fragment>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:nameBooking')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {lists!.name}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:phoneNumber')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {lists!.phone}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              Email
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {lists!.email}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:bookingPerson')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {lists!.name_received ? lists!.name_received : lists!.name}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:phonePerson')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {lists!.phone_received ? lists!.phone_received : lists!.phone}
                            </Grid>
                          </Grid>
                          {/* <Grid container item xs={12}>
                            <Grid item xs={4} className={'fontLow'}>
                              Email
                            </Grid>
                            <Grid container item xs={8} className={'fontLow'} justify="flex-end">
                              {lists!.email_received ? lists!.email_received : lists!.email}
                            </Grid>
                          </Grid> */}
                        </Fragment>
                      )}
                    </Grid>
                  ) : (
                    <SimpleLoader />
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaymentInfo;
