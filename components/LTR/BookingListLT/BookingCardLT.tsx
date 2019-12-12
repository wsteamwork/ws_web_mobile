import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Box
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import moment from 'moment';
import numeral from 'numeral';
import React, { FC, Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LongTermBookingAction } from '@/store/Redux/Reducers/Booking/long-term-booking';
import { TransitionCustom } from '@/components/Book/BookingForm';
import Cookies from 'universal-cookie';
import PaymentType from './PaymentType';
import ReNewalBooking from './ReNewalBooking';
interface IProps {
  classes?: any;
  booking: any;
  status: string[];
  bookingType: number;
}

export const UPCOMING = 1;
export const CURRENT = 2;
export const FINISHED = 3;

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0',
    cursor: 'pointer'
  }
}))(Tooltip);

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    },
    paper: {
      padding: '16px',
      border: '1px solid #eeeeee',
      boxShadow: 'none',
      borderRadius: 16,
      '&:hover': {
        boxShadow: '0 2px 9px -2px rgba(132,135,138,.2)'
      }
    },
    title: {
      fontWeight: 600
    },
    content: {
      height: '100%'
    },
    img: {
      display: 'block',
      width: 64,
      height: 64,
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '50%'
    },
    imgDefault: {
      width: 64,
      height: 64,
      margin: 'auto'
    },
    widthImg: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8,
        maxHeight: 90
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: 97
      }
    },
    wrapperImage: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        height: 97
      },
      [theme.breakpoints.down('xs')]: {
        height: 90
      },
      backgroundColor: '#3d5c5c',
      border: '1px solid #ffffff',
      borderRadius: '10px'
    },
    boxAction: {
      display: 'flex',
      justifyContent: 'center'
    },
    boxPayment: {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: 17,
      fontWeight: theme.typography.fontWeightBold
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceDay: {
      display: 'flex',
      fontSize: 14
    },
    infoRoomName: {
      display: 'flex'
    },
    iconVerified: {
      width: '16px',
      float: 'inherit',
      position: 'relative',
      top: 2,
      left: 5
    },
    marginLabel: {
      margin: '16px 0'
    },
    dayPayment: {
      color: 'blue',
      marginTop: 3,
      fontWeight: theme.typography.fontWeightBold
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    infoContract: {
      margin: '6px 0'
    },
    imgDetail: {
      height: 45,
      [theme.breakpoints.down('sm')]: {
        height: 35
      },
      [theme.breakpoints.down('xs')]: {
        height: 30
      }
    },
    wrapperPaymentXs: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    divider: {
      margin: '16px 0'
    },
    detailPrice: {
      margin: '16px 0',
      fontWeight: theme.typography.fontWeightBold
    },
    customerName: {
      fontWeight: theme.typography.fontWeightBold
    },
    TableCell: {
      paddingLeft: 0,
      color: '#484848',
      fontWeight: theme.typography.fontWeightBold
    },
    TableValue: {
      paddingLeft: 0
    },
    arrow: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      boxShadow: 'none',
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#cc0066',
      padding: '2px 8px',
      marginTop: '3px',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#cc0066'
      }
    },
    buttonRenewal: {
      boxShadow: 'none',
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: 'blue',
      padding: '8px',
      marginTop: '3px',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: 'blue'
      }
    },
    buttonCancel: {
      boxShadow: 'none',
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#484848',
      padding: '7px 10px',
      width: 80,
      marginBottom: '20px',
      borderRadius: 25,
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#484848'
      }
    },
    wrapperContract: {
      display: 'flex',
      alignItems: 'end',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-end'
      }
    },
    currentBook: {
      color: '#53D4C8'
    },
    finishedBook: {
      color: '#292929'
    }
  })
);

const BookingCardLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const cookies = new Cookies();
  const { booking, status, bookingType } = props;
  const { width } = useContext(GlobalContext);
  const [openList, setOpenList] = useState<boolean>(false);
  const [openCurrent, setOpenCurrent] = useState<boolean>(false);
  const [openTermPayment, setOpenTermPayment] = useState<boolean>(false);
  const currentContract = booking.contracts.data[booking.contracts.data.length - 1];
  const nextPaymentDue = booking.contracts.data[0].next_payment_due;
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openRenewal, setOpenRenewal] = useState<boolean>(false);

  const handleClosePayment = () => {
    setOpenPayment(false);
  };
  const openPaymentBooking = () => {
    setOpenPayment(true);
  };
  const handleCloseRenewalBooking = () => {
    setOpenRenewal(false);
  };
  const openPaymentRenewalBooking = () => {
    setOpenRenewal(true);
  };
  const handleClickOpenList = () => {
    setOpenList(true);
  };
  const handleCloseList = () => {
    setOpenList(false);
  };
  const openCurrentContract = () => {
    setOpenCurrent(true);
  };
  const handleCloseCurrent = () => {
    setOpenCurrent(false);
  };
  const openTermPaymentContract = () => {
    setOpenTermPayment(true);
  };
  const handleCloseTermPaymentContract = () => {
    setOpenTermPayment(false);
  };
  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  {booking.longTermRoom &&
                  booking.longTermRoom.data &&
                  booking.longTermRoom.data.avatar &&
                  booking.longTermRoom.data.avatar.images.length ? (
                    <Grid item xs={3} sm={2} className={classes.widthImg}>
                      <img
                        className={classes.img}
                        src={IMAGE_STORAGE_LG + booking.longTermRoom.data.avatar.images[0].name}
                        alt="Westay - Homestay cho người việt"
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={3} className={classes.widthImg}>
                      <Grid className={classes.wrapperImage}>
                        <img
                          src={'/static/images/camera.svg'}
                          alt="Camera"
                          className={classes.imgDefault}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={9} sm={10}>
                    <Grid container>
                      <Grid item>
                        <Grid item xs={12} className={classes.infoRoomName}>
                          <span className={classes.customerName}>
                            #{booking.uuid}
                            <Tooltip
                              title={`Verified`}
                              placement="bottom"
                              classes={{ tooltip: 'tooltip' }}>
                              <img
                                src={'/static/images/verified.svg'}
                                alt="Verified"
                                className={classes.iconVerified}
                              />
                            </Tooltip>
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.infoContract}>
                      <Typography variant="body1" className={classes.customerName}>
                        {t('longtermbooking:checkin')}:{' '}
                        {moment(booking.current_contract.move_in).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.infoContract}>
                      <Typography variant="body1" className={classes.customerName}>
                        {t('longtermbooking:checkout')}:{' '}
                        {moment(booking.current_contract.move_out).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.infoContract}>
                      <Typography variant="body1" className={classes.customerName}>
                        <a
                          href={`https://westay.vn/long-term-room/${booking.longTermRoom.data.id}`}
                          target="_blank">
                          {booking.longTermRoom.data.about_room.name}
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                  {bookingType === CURRENT && booking.contracts.data[0].next_payment_due && (
                    <Grid item xs={12} sm={12}>
                      <Grid className={classes.content}>
                        <Divider className={classes.marginLabel} />
                        <Grid item xs={12} className={classes.wrapperPaymentXs}>
                          <Grid item className={classes.infoContract}>
                            <Typography variant="body1" className={classes.customerName}>
                              {t('longtermbooking:paymentPeriod')}
                            </Typography>
                            <Typography variant="body1" className={classes.dayPayment}>
                              {moment(nextPaymentDue.payment_due_date).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                          <Grid item className={classes.infoContract} xs={4}>
                            <Box>
                              <Typography variant="body1" className={classes.boxPayment}>
                                {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                                {numeral(nextPaymentDue.payment_amount).format('0,0')}
                              </Typography>
                              <Grid className={classes.boxPayment}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={openPaymentBooking}
                                  className={classes.button}>
                                  {t('longtermbooking:payment')}
                                </Button>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12}>
                    <Grid className={classes.content}>
                      <Divider className={classes.marginLabel} />
                      <Grid item xs={12} className={classes.wrapperPaymentXs}>
                        {bookingType !== CURRENT ? (
                          <Grid item className={classes.infoContract}>
                            <Typography variant="body1" className={classes.customerName}>
                              {t('longtermbooking:paymentPeriod')}
                            </Typography>
                            <Typography variant="body1" className={classes.dayPayment}>
                              {moment(nextPaymentDue.payment_due_date).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                        ) : (
                          <Grid item className={classes.infoContract} xs={8}>
                            <Typography variant="body1" className={classes.customerName}>
                              {t('longtermbooking:descriptionRenewal')}
                            </Typography>
                          </Grid>
                        )}
                        <Grid item className={classes.infoContract} xs={4}>
                          {bookingType === UPCOMING && (
                            <Box>
                              <Typography variant="body1" className={classes.boxPayment}>
                                {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                                {numeral(nextPaymentDue.payment_amount).format('0,0')}
                              </Typography>
                              <Grid className={classes.boxPayment}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={openPaymentBooking}
                                  className={classes.button}>
                                  {t('longtermbooking:payment')}
                                </Button>
                              </Grid>
                            </Box>
                          )}
                          {bookingType === CURRENT && (
                            <Grid className={classes.boxPayment}>
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={openPaymentRenewalBooking}
                                className={classes.buttonRenewal}>
                                {t('longtermbooking:renewalNow')}
                              </Button>
                            </Grid>
                          )}
                          {bookingType === FINISHED && (
                            <Grid>
                              <Typography variant="body1" className={classes.finishedBook}>
                                {t('longtermbooking:finished')}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/contract-list.svg'}
                        alt="Contract List"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Grid onClick={handleClickOpenList}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          {t('longtermbooking:contractList')}
                        </Typography>
                        <Typography variant={'body1'} className={classes.customerName}>
                          {t('longtermbooking:readDetails')}
                          <img
                            src={'/static/preview.svg'}
                            width={16}
                            height={16}
                            style={{ marginLeft: 6 }}
                          />
                        </Typography>
                      </Grid>
                      <Dialog
                        TransitionComponent={TransitionCustom}
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openList}
                        onClose={handleCloseList}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            {t('longtermbooking:allContract')}
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.TableCell}>#</TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:bookingCode')}
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:bookingStatus')}
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:bookingPeriod')}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {booking.contracts.data.map((row, i) => (
                                <TableRow key={row.id}>
                                  <TableCell
                                    className={classes.TableValue}
                                    component="th"
                                    scope="row">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {row.uuid}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {row.status_txt}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    <Typography variant="subtitle1" className={classes.priceDay}>
                                      {row.move_in}
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.arrow}>
                                      &#8594;
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.priceDay}>
                                      {row.move_out}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                        <DialogActions className={classes.boxAction}>
                          <Button
                            onClick={handleCloseList}
                            className={classes.buttonCancel}
                            color="primary"
                            autoFocus>
                            {t('longtermbooking:exit')}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/contract-current.svg'}
                        alt="Contract Current"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Click để xem chi tiết`}
                        style={{ cursor: 'pointer' }}>
                        <Grid onClick={openCurrentContract}>
                          <Typography variant="subtitle1" className={classes.priceDay}>
                            {t('longtermbooking:currentContract')}
                          </Typography>
                          <Typography variant={'body1'} className={classes.customerName}>
                            {t('longtermbooking:readDetails')}{' '}
                            <img
                              src={'/static/preview.svg'}
                              width={16}
                              height={16}
                              style={{ marginLeft: 6 }}
                            />
                          </Typography>
                        </Grid>
                      </HtmlTooltip>
                      <Dialog
                        TransitionComponent={TransitionCustom}
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openCurrent}
                        onClose={handleCloseCurrent}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            {t('longtermbooking:infoCurrentContract')}: {currentContract.uuid}
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2" className={classes.detailPrice}>
                              {t('longtermbooking:infomation')}
                            </Typography>
                            <Typography variant="subtitle2" className={classes.detailPrice}>
                              {t('longtermbooking:Value')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:bookingCode')}
                            </Typography>
                            <Typography variant="subtitle2">{currentContract.uuid}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:value')}
                            </Typography>
                            <Typography variant="subtitle2">
                              {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                              {numeral(currentContract.price_original).format('0,0')}
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:deposit')}
                            </Typography>
                            <Typography variant="subtitle2">
                              {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                              {numeral(
                                currentContract.price_with_fee - currentContract.price_original
                              ).format('0,0')}{' '}
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:total')}
                            </Typography>
                            <Typography variant="subtitle2">
                              {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                              {numeral(currentContract.price_with_fee).format('0,0')}
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">{t('longtermbooking:days')}</Typography>
                            <Typography variant="subtitle2">
                              {currentContract.range_stay}{' '}
                              {cookies.get('initLanguage') == 'en' ? 'days' : 'ngày'}
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:applyFrom')}
                            </Typography>
                            <Typography variant="subtitle2">{currentContract.move_in}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:applyTo')}
                            </Typography>
                            <Typography variant="subtitle2">{currentContract.move_out}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">
                              {t('longtermbooking:created_at')}
                            </Typography>
                            <Typography variant="subtitle2">
                              {currentContract.created_at.substring(11, 16)} -{' '}
                              {moment(currentContract.created_at).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                        </DialogContent>
                        <DialogActions className={classes.boxAction}>
                          <Button
                            onClick={handleCloseCurrent}
                            className={classes.buttonCancel}
                            color="primary"
                            autoFocus>
                            {t('longtermbooking:exit')}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/debit-card.svg'}
                        alt="Debit Card"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9}>
                      <Grid onClick={openTermPaymentContract}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          {t('longtermbooking:paymentPeriod')}
                        </Typography>
                        <Typography variant={'body1'} className={classes.customerName}>
                          {t('longtermbooking:readDetails')}
                          <img
                            src={'/static/preview.svg'}
                            width={16}
                            height={16}
                            style={{ marginLeft: 8 }}
                          />
                        </Typography>
                      </Grid>
                      <Dialog
                        TransitionComponent={TransitionCustom}
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openTermPayment}
                        onClose={handleCloseTermPaymentContract}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            {t('longtermbooking:allpaymentPeriod')}: {currentContract.uuid}
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.TableCell}>#</TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:bookingPeriod')}
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:Value')}
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  {t('longtermbooking:bookingStatus')}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {currentContract.payment.payment_period.map((row, i) => (
                                <TableRow key={row.id}>
                                  <TableCell
                                    className={classes.TableValue}
                                    component="th"
                                    scope="row">
                                    {row.id}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {moment(row.payment_due_date).format('DD/MM/YYYY')}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {cookies.get('initLanguage') == 'en' ? '$' : 'đ'}
                                    {numeral(row.payment_amount).format('0,0')}
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {row.payment_status_txt}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                        <DialogActions className={classes.boxAction}>
                          <Button
                            onClick={handleCloseTermPaymentContract}
                            className={classes.buttonCancel}
                            color="primary"
                            autoFocus>
                            {t('longtermbooking:exit')}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} className={classes.maxWidthIcon}>
                      {booking.contracts.data[0].status === 1 && (
                        <img
                          src={'/static/images/new.svg'}
                          alt="Rent Status"
                          className={classes.imgDetail}
                        />
                      )}
                      {booking.contracts.data[0].status === 5 && (
                        <img
                          src={'/static/images/cancel-contract.svg'}
                          alt="Rent Status"
                          className={classes.imgDetail}
                        />
                      )}
                      {booking.contracts.data[0].status !== 1 &&
                        booking.contracts.data[0].status !== 5 && (
                          <img
                            src={'/static/images/accept-contract.svg'}
                            alt="Rent Status"
                            className={classes.imgDetail}
                          />
                        )}
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9}>
                      <Grid>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          {t('longtermbooking:contractStatus')}
                        </Typography>
                        <Typography variant={'body1'} className={classes.customerName}>
                          {booking.contracts.data[0].status_txt}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <PaymentType handleClose={handleClosePayment} open={openPayment} booking={booking} />
      <ReNewalBooking
        handleClose={handleCloseRenewalBooking}
        open={openRenewal}
        booking={booking}
        status={status}
      />
    </Fragment>
  );
};
export default BookingCardLT;
