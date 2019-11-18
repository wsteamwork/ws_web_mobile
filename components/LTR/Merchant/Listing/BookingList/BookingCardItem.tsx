import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { BookingListReducerAction, getBookingListLT } from '@/store/Redux/Reducers/LTR/BookingList/bookinglist';
import { axios_merchant } from '@/utils/axiosInstance';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { faEnvelope, faPhoneAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Hidden, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import moment from 'moment';
import numeral from 'numeral';
import React, { FC, Fragment, SyntheticEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
interface IProps {
  classes?: any;
  booking: any;
}

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
    contentXsDown: {
      [theme.breakpoints.down('xs')]: {
        marginTop: 8
      }
    },
    img: {
      display: 'block',
      width: 130,
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '10px',
      [theme.breakpoints.down('xs')]: {
        width: 130
      }
    },
    imgDefault: {
      width: 130,
      height: 40,
      margin: 'auto',
      [theme.breakpoints.down('xs')]: {
        width: 130,
        height: 35
      }
    },
    widthImg: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8,
        maxHeight: 90
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 160,
        maxHeight: 105
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: 97
      }
    },
    wrapperImage: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: 130
      },
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
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceDay: {
      display: 'flex',
      fontSize: 14
    },
    priceAll: {
      display: 'flex',
      fontWeight: 600,
      fontSize: 14
    },
    infoRoomName: {
      display: 'flex'
    },
    infoCustomer: {
      maxWidth: 180
    },
    iconVerified: {
      width: '14px',
      float: 'inherit',
      position: 'relative',
      top: 2,
      left: 5
    },
    spanIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    marginLabel: {
      margin: '16px 0'
    },
    IconButton: {
      backgroundColor: '#E1E8F7',
      color: '#3E93F8',
      borderRadius: '50%',
      padding: 8,
      marginLeft: 8,
      '&:hover': {
        background: '#3E93F8',
        color: '#fff'
      }
    },
    customIcon: {
      color: '#484848'
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    infoContract: {
      margin: '6px 0'
    },
    imgDetail: {
      height: 45,
      [theme.breakpoints.down('md')]: {
        height: 40
      },
      [theme.breakpoints.down('sm')]: {
        height: 35
      },
      [theme.breakpoints.down('xs')]: {
        height: 30
      }
    },
    subLabel: {
      display: 'flex',
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
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
    button: {
      boxShadow: 'none',
      marginTop: 5,
      marginRight: 13,
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#1d8df7',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#1d8df7'
      }
    },
    buttonCancel: {
      boxShadow: 'none',
      marginTop: 5,
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#3B4350',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#3B4350'
      }
    },
    wrapperContract: {
      display: 'flex',
      alignItems: 'end',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-end'
      }
    }
  })
);
const BookingCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { booking } = props;
  const { width } = useContext(GlobalContext);
  const [openList, setOpenList] = useState<boolean>(false);
  const [openCurrent, setOpenCurrent] = useState<boolean>(false);
  const [openTermPayment, setOpenTermPayment] = useState<boolean>(false);
  const currentContract = booking.contracts.data[booking.contracts.data.length - 1];
  const nextPaymentDue = booking.contracts.data[0].next_payment_due;
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<any>(null);
  const [statusSnack, setStatusSnack] = useState<any>('success');
  const dispatch = useDispatch<Dispatch<BookingListReducerAction>>();
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
  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  const submitApprovedBooking = async () => {
    try {
      const res = await axios_merchant.put(
        `long-term-contracts/minor-update/${booking.contracts.data[0].id}?option=status`,
        {
          status: 2
        }
      );
      setMessageSnack('Đơn đặt phòng được xác nhận thành công !');
      setOpenSnack(true);
      getBookingListLT(dispatch);
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được xác nhận !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };

  const confirmCancelBooking = async () => {
    try {
      const res = await axios_merchant.put(
        `long-term-contracts/minor-update/${booking.contracts.data[0].id}?option=status`,
        {
          status: 5
        }
      );
      if (res) {
        setMessageSnack('Đơn đặt phòng được hủy thành công !');
        setOpenSnack(true);
        getBookingListLT(dispatch);
      }
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được hủy !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  {booking.longTermRoom && booking.longTermRoom.data && booking.longTermRoom.data.avatar &&
                    booking.longTermRoom.data.avatar.images.length ? (
                      <Grid item xs={6} sm={3} md={3} lg={2} className={classes.widthImg}>
                        <img
                          className={classes.img}
                          src={IMAGE_STORAGE_LG + booking.longTermRoom.data.avatar.images[0].name}
                          alt="Westay - Homestay cho người việt"
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={6} sm={3} md={3} lg={2} className={classes.widthImg}>
                        <Grid className={classes.wrapperImage}>
                          <img
                            src={'/static/images/camera.svg'}
                            alt="Camera"
                            className={classes.imgDefault}
                          />
                        </Grid>
                      </Grid>
                    )}
                  <Hidden smUp>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Kỳ thanh toán tiếp theo:{' '}
                        {moment(nextPaymentDue.payment_due_date).format(
                          'DD/MM/YYYY'
                        )}
                      </Typography>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Giá trị:{' '}
                        {numeral(nextPaymentDue.payment_amount).format(
                          '0,0'
                        )}{' '}
                        vnđ
                      </Typography>
                      {booking.contracts.data[0].status === 1 && (
                        <Grid>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={submitApprovedBooking}
                            className={classes.button}>
                            Xác nhận
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={confirmCancelBooking}
                            className={classes.buttonCancel}>
                            Hủy bỏ
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={9} md={6} lg={6} className={classes.contentXsDown}>
                    <Grid className={classes.content}>
                      <Grid container>
                        <Grid item>
                          <Grid item sm={6} xs={12} className={classes.infoRoomName}>
                            <span>
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

                          {booking.contracts.data[0].status !== 1 &&
                            booking.contracts.data[0].status !== 5 ? (
                              <Grid className={classes.price}>
                                <Grid container item xs={12} sm={12} lg={12} spacing={1}>
                                  <Grid item xs={6} lg={6} className={classes.infoCustomer}>
                                    <Grid container>
                                      <Grid item xs={2} className={classes.spanIcon}>
                                        <FontAwesomeIcon
                                          className={classes.customIcon}
                                          icon={faUserFriends}></FontAwesomeIcon>
                                      </Grid>
                                      <Grid className={classes.nameIcon} item xs={10}>
                                        <Typography variant="subtitle1" className={classes.priceAll}>
                                          {booking.name}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={6} lg={6} className={classes.infoCustomer}>
                                    <Grid container>
                                      <Grid item xs={2} className={classes.spanIcon}>
                                        <FontAwesomeIcon
                                          className={classes.customIcon}
                                          icon={faUserFriends}></FontAwesomeIcon>
                                      </Grid>
                                      <Grid className={classes.nameIcon} item xs={10}>
                                        <Typography variant="subtitle1" className={classes.priceAll}>
                                          {booking.guests.total_guests} khách
                                      </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={6} lg={6} className={classes.infoCustomer}>
                                    <Grid container>
                                      <Grid item xs={2} className={classes.spanIcon}>
                                        <FontAwesomeIcon
                                          className={classes.customIcon}
                                          icon={faPhoneAlt}></FontAwesomeIcon>
                                      </Grid>
                                      <Grid className={classes.nameIcon} item xs={10}>
                                        <Typography variant="subtitle1" className={classes.priceAll}>
                                          {booking.phone}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={6} lg={6} className={classes.infoCustomer}>
                                    <Grid container>
                                      <Grid item xs={2} className={classes.spanIcon}>
                                        <FontAwesomeIcon
                                          className={classes.customIcon}
                                          icon={faEnvelope}></FontAwesomeIcon>
                                      </Grid>
                                      <Grid className={classes.nameIcon} item xs={10}>
                                        <Typography variant="subtitle1" className={classes.priceAll}>
                                          {booking.email}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ) : (
                              <Typography variant="subtitle1" className={classes.priceAll}>
                                Vui lòng xác nhận để xem thông tin khách
                            </Typography>
                            )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={8} className={classes.infoContract}>
                        <Typography variant="body1">
                          Số lượng hợp đồng:{' '}
                          {booking.contracts.data.length ? booking.contracts.data.length : 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={8} className={classes.infoContract}>
                        <Typography variant="body1">
                          Ngày nhận phòng: {moment(booking.latest_move_in).format('DD/MM/YYYY')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={8} className={classes.infoContract}>
                        <Typography variant="body1">
                          Ngày trả phòng: {moment(booking.latest_move_out).format('DD/MM/YYYY')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={8} className={classes.infoContract}>
                        <Typography variant="body1">
                          Căn hộ:{' '}
                          <a
                            href={`https://westay.vn/long-term-room/${booking.longTermRoom.data.id}`}
                            target="_blank">
                            {booking.longTermRoom.data.id} - {booking.longTermRoom.data.room_name}
                          </a>
                        </Typography>
                      </Grid>
                      <Hidden only={['xs', 'lg']}>
                        <Divider className={classes.marginLabel} />
                        <Grid item xs={12} lg={8} className={classes.infoContract}>
                          <Typography variant="body1">
                            Kỳ thanh toán tiếp theo:{' '}
                            {moment(
                              nextPaymentDue.payment_due_date
                            ).format('DD/MM/YYYY')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={8} className={classes.infoContract}>
                          <Typography variant="body1">
                            Giá trị:{' '}
                            {numeral(
                              nextPaymentDue.payment_amount
                            ).format('0,0')}{' '}
                            vnđ
                          </Typography>
                          {booking.contracts.data[0].status === 1 && (
                            <Grid>
                              {' '}
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={submitApprovedBooking}
                                className={classes.button}>
                                Xác nhận
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={confirmCancelBooking}
                                className={classes.buttonCancel}>
                                Hủy bỏ
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>

                  <Hidden mdDown>
                    <Grid item xs={12} sm={9} md={3} lg={4}>
                      <Grid className={classes.content}>
                        <Grid container>
                          <Grid container item xs={10} justify="flex-end">
                            <Grid item>
                              <Typography variant="subtitle1" className={classes.priceDay}>
                                Kỳ thanh toán tiếp theo:{' '}
                                {moment(
                                  nextPaymentDue.payment_due_date
                                ).format('DD/MM/YYYY')}
                              </Typography>
                              <Typography variant="subtitle1" className={classes.priceDay}>
                                Giá trị:{' '}
                                {numeral(
                                  nextPaymentDue.payment_amount
                                ).format('0,0')}{' '}
                                vnđ
                              </Typography>
                              {booking.contracts.data[0].status === 1 && (
                                <Grid>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={submitApprovedBooking}
                                    className={classes.button}>
                                    Xác nhận
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={confirmCancelBooking}
                                    className={classes.buttonCancel}>
                                    Hủy bỏ
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md lg xl={3}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/contract-list.svg'}
                        alt="Contract List"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Click để xem chi tiết`}
                        style={{ cursor: 'pointer' }}>
                        <Grid onClick={handleClickOpenList}>
                          <Typography variant="subtitle1" className={classes.priceDay}>
                            Danh sách hợp đồng
                          </Typography>
                          <Typography variant={'body1'} className={classes.subLabel}>
                            Xem chi tiết
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
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openList}
                        onClose={handleCloseList}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            Tất cả hợp đồng của đơn đặt phòng
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.TableCell}>#</TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  MÃ HĐ
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  TRẠNG THÁI
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  KỲ HẠN
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
                                    {row.move_in} &#8594; {row.move_out}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseList}
                            className={classes.button}
                            color="primary"
                            autoFocus>
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md lg xl={3}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/contract-current.svg'}
                        alt="Contract Current"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Click để xem chi tiết`}
                        style={{ cursor: 'pointer' }}>
                        <Grid onClick={openCurrentContract}>
                          <Typography variant="subtitle1" className={classes.priceDay}>
                            Hợp đồng hiện tại
                          </Typography>
                          <Typography variant={'body1'} className={classes.subLabel}>
                            Xem chi tiết{' '}
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
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openCurrent}
                        onClose={handleCloseCurrent}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            Thông tin hợp đồng hiện tại: {currentContract.uuid}
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2" className={classes.detailPrice}>
                              Thông tin
                            </Typography>
                            <Typography variant="subtitle2" className={classes.detailPrice}>
                              Giá Trị
                            </Typography>
                          </Grid>
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Mã HĐ</Typography>
                            <Typography variant="subtitle2">{currentContract.uuid}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Giá trị</Typography>
                            <Typography variant="subtitle2">
                              {numeral(currentContract.price_original).format('0,0')} vnđ
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Đặt cọc</Typography>
                            <Typography variant="subtitle2">
                              {numeral(
                                currentContract.price_with_fee - currentContract.price_original
                              ).format('0,0')}{' '}
                              vnđ
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Tổng</Typography>
                            <Typography variant="subtitle2">
                              {numeral(currentContract.price_with_fee).format('0,0')} vnđ
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Thời gian ở</Typography>
                            <Typography variant="subtitle2">
                              {currentContract.range_stay} ngày
                            </Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Hiệu lực từ</Typography>
                            <Typography variant="subtitle2">{currentContract.move_in}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Hiệu lực tới</Typography>
                            <Typography variant="subtitle2">{currentContract.move_out}</Typography>
                          </Grid>
                          <Divider className={classes.divider} />
                          <Grid item xs={12} className={classes.wrapperPaymentXs}>
                            <Typography variant="subtitle2">Ngày tạo</Typography>
                            <Typography variant="subtitle2">
                              {currentContract.created_at.substring(11, 16)} -{' '}
                              {moment(currentContract.created_at).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseCurrent}
                            className={classes.button}
                            color="primary"
                            autoFocus>
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md lg xl={3}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
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
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Grid>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          Trạng thái hợp đồng
                        </Typography>
                        <Typography variant={'body1'} className={classes.subLabel}>
                          {booking.contracts.data[0].status_txt}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md lg xl={3}>
                  <Grid container className={classes.wrapperContract}>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/debit-card.svg'}
                        alt="Debit Card"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Click để xem chi tiết`}
                        style={{ cursor: 'pointer' }}>
                        <Grid onClick={openTermPaymentContract}>
                          <Typography variant="subtitle1" className={classes.priceDay}>
                            Kỳ thanh toán
                          </Typography>
                          <Typography variant={'body1'} className={classes.subLabel}>
                            Xem chi tiết
                            <img
                              src={'/static/preview.svg'}
                              width={16}
                              height={16}
                              style={{ marginLeft: 8 }}
                            />
                          </Typography>
                        </Grid>
                      </HtmlTooltip>
                      <Dialog
                        fullScreen={width === 'xs'}
                        maxWidth="sm"
                        open={openTermPayment}
                        onClose={handleCloseTermPaymentContract}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          <span className={classes.customerName}>
                            Tất cả kỳ thanh toán của hợp đồng: {currentContract.uuid}
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.TableCell}>#</TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  KỲ HẠN
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  GIÁ TRỊ
                                </TableCell>
                                <TableCell className={classes.TableCell} align="left">
                                  TRẠNG THÁI
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
                                    {numeral(row.payment_amount).format('0,0')} vnđ
                                  </TableCell>
                                  <TableCell className={classes.TableValue} align="left">
                                    {row.payment_status_txt}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseTermPaymentContract}
                            className={classes.button}
                            color="primary"
                            autoFocus>
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack}></MySnackbarContentWrapper>
      </Snackbar>
    </Fragment>
  );
};
export default BookingCardItem;
