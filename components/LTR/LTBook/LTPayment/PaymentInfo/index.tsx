import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { PaymentBankListRes } from '@/types/Requests/Payment/PaymentResponse';
import { formatMoney } from '@/utils/mixins';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Paper, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import moment from 'moment';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InfoHeader from './InfoHeader';

const PaymentInfo: FC = () => {
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  const xsMode = width === 'xs';
  // const [infoStatus, setInfoStatus] = useState<boolean>(!xsMode);
  const LTDataInvoice = useSelector<ReducersList, PaymentBankListRes>(
    (state) => state.ltBooking.LTDataInvoice
  );
  const longTermRoom = useSelector<ReducersList, LTRoomIndexRes>(
    (state) => state.ltBooking.LTDataInvoice.longTermRoom.data
  );
  let checkInDate = LTDataInvoice ? moment(LTDataInvoice!.latest_move_in) : moment();
  let checkOutDate = LTDataInvoice ? moment(LTDataInvoice!.latest_move_out) : moment();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={'paymentInfo'}>
          <Grid container spacing={2}>
            {longTermRoom ? (
              <Fragment>
                <InfoHeader room={longTermRoom} />
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
                        {LTDataInvoice!.guests.total_guests} {t('payment:invoice:guest')}
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
                        justify="flex-end">{`${formatMoney(
                          LTDataInvoice!.contracts.data[0].next_payment_due.payment_amount
                        )}đ`}</Grid>
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
                        justify="flex-end">{`${formatMoney(LTDataInvoice!.additional_fee)}đ`}</Grid>
                    </Grid>
                    {LTDataInvoice!.coupon && (
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLow'}>
                          {t('payment:invoice:promotionCode')} ({LTDataInvoice!.coupon})
                        </Grid>
                        <Grid
                          container
                          item
                          xs={6}
                          className={'fontLow'}
                          justify="flex-end">{`${formatMoney(
                            LTDataInvoice!.coupon_discount
                          )}đ`}</Grid>
                      </Grid>
                    )}

                    {LTDataInvoice!.price_discount > 0 && (
                      <Grid container item xs={12}>
                        <Grid item xs={6} className={'fontLow'}>
                          {t('payment:invoice:sale')}
                        </Grid>
                        <Grid
                          container
                          item
                          xs={6}
                          className={'fontLow'}
                          justify="flex-end">{`${formatMoney(
                            LTDataInvoice!.price_discount
                          )}đ`}</Grid>
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
                        <Typography variant="h6">{`${formatMoney(
                          LTDataInvoice!.contracts.data[0].next_payment_due.payment_amount
                        )}đ`}</Typography>
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
                  {longTermRoom && LTDataInvoice ? (
                    <Grid container spacing={2}>
                      {
                        <Fragment>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:nameBooking')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.name}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:phoneNumber')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.phone}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              Email
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.email}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:bookingPerson')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.name_received
                                ? LTDataInvoice!.name_received
                                : LTDataInvoice!.name}
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <Grid item xs={6} className={'fontLow'}>
                              {t('payment:invoice:phonePerson')}
                            </Grid>
                            <Grid container item xs={6} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.phone_received
                                ? LTDataInvoice!.phone_received
                                : LTDataInvoice!.phone}
                            </Grid>
                          </Grid>
                          {/* <Grid container item xs={12}>
                            <Grid item xs={4} className={'fontLow'}>
                              Email
                            </Grid>
                            <Grid container item xs={8} className={'fontLow'} justify="flex-end">
                              {LTDataInvoice!.email_received ? LTDataInvoice!.email_received : LTDataInvoice!.email}
                            </Grid>
                          </Grid> */}
                        </Fragment>
                      }
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
