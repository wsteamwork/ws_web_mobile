import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import NotFoundGlobal from '@/components/Rooms/Lotte/NotFoundGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateObject } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  BookingListReducerAction,
  getBookingListST
} from '@/store/Redux/Reducers/LTR/BookingList/bookinglist';
import { axios_merchant } from '@/utils/axiosInstance';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Hidden,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Theme,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Router from 'next/router';
import numeral from 'numeral';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import localeInfo from 'rc-pagination/lib/locale/vi_VN';
import React, {
  FC,
  Fragment,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll/modules';
import { ReactScrollLinkProps } from 'react-scroll/modules/components/Link';
import { Dispatch } from 'redux';
import CardTextarea from '../CreateListing/Description/CardTextarea';
import FilterBookingList from './FilterBookingList';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    container: {
      overflowX: 'auto',
      marginRight: 'auto',
      marginLeft: 'auto',
      padding: '10px',
      margin: theme.spacing(5, 0)
    },
    tableCell: {
      paddingLeft: 0,
      color: '#484848',
      fontSize: 16,
      fontWeight: theme.typography.fontWeightBold
    },
    tableValue: {
      paddingLeft: 0,
      fontSize: 14
    },
    name: {
      fontSize: 16,
      fontWeight: theme.typography.fontWeightBold
    },
    customerName: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: 3
    },
    valueNormal: {
      marginBottom: 3
    },
    statusBookSuccess: {
      color: '#4fc47f',
      fontWeight: theme.typography.fontWeightBold
    },
    statusBookWaiting: {
      color: '#1d8df7',
      fontWeight: theme.typography.fontWeightBold
    },
    statusBookCancel: {
      fontWeight: theme.typography.fontWeightBold
    },
    button: {
      width: 79.58,
      boxShadow: 'none',
      marginTop: 5,
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
      width: 79.58,
      boxShadow: 'none',
      marginTop: 8,
      color: '#ffffff',
      textTransform: 'initial',
      backgroundColor: '#3B4350',
      '&:hover': {
        color: '#ffffff',
        textTransform: 'initial',
        backgroundColor: '#3B4350'
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 5,
        marginLeft: 10
      }
    },
    wrapperPayment: {
      display: 'flex',
      alignItems: 'center'
    },
    wrapperPaymentXs: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    moreIcon: {
      marginLeft: 10
    },
    divider: {
      margin: '16px 0'
    },
    detailPrice: {
      margin: '16px 0',
      fontWeight: theme.typography.fontWeightBold
    },
    notPayment: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: 3,
      [theme.breakpoints.down('xs')]: {
        marginRight: 15
      }
    },
    tableRow: {
      [theme.breakpoints.down('xs')]: {
        borderBottom: '1.5pt solid #bbbbbb'
      }
    }
  })
);

const ShortTermBookingList: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { router, width } = useContext(GlobalContext);
  const [open, setOpen] = useState<number>(0);
  const [openCancel, setOpenCancel] = useState<number>(0);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<any>(null);
  const [statusSnack, setStatusSnack] = useState<any>('success');
  const [reason, setReason] = useState<number>(3);
  const [reasonList, setReasonList] = useState<any>(null);
  const [reasonDescription, setReasonDescription] = useState<string>('');

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleClickOpen = (i: number) => {
    setOpen(i);
  };

  const handleClickOpenCancel = (i: number) => {
    setOpenCancel(i);
  };

  const handleClose = () => {
    setOpen(0);
  };
  const handleCloseCancel = () => {
    setOpenCancel(0);
  };

  const bookinglist = useSelector<ReducersList, any>((state) => state.bookinglist.bookingList_ST);
  const meta = useSelector<ReducersList, any>((state) => state.bookinglist.meta);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { startDate, endDate, searchName, room_id, codeBooking, statusBooking } = useSelector<
    ReducersList,
    any
  >((state) => state.bookinglist);

  const scrollTop = () => {
    let duration = 500 + window.scrollY * 0.1;
    let effect: Partial<ReactScrollLinkProps> = {
      smooth: 'easeInOutQuad',
      isDynamic: true,
      duration
    };
    scroll.scrollToTop(effect);
  };

  const changePage = (current: number) => {
    setCurrentPage(current);
    const query = {
      page: current
    };
    Router.push({
      pathname: '/host/booking-list',
      query: updateObject<any>(Router.query, query)
    });
    scrollTop();
  };

  const dispatch = useDispatch<Dispatch<BookingListReducerAction>>();

  useEffect(() => {
    if (!bookinglist.length) {
      getBookingListST(dispatch, {});
    }
  }, []);

  useEffect(() => {
    getBookingListST(dispatch, {
      nameSearch: searchName,
      date_start: startDate,
      date_end: endDate,
      status: statusBooking,
      room_id: room_id,
      booking_code: codeBooking
    });
  }, [router.query]);

  useEffect(() => {
    getCancelReasonList();
  }, []);

  useEffect(() => {
    setIsEmpty(bookinglist.length === 0);
  }, [bookinglist]);

  const changeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(parseInt(event.target.value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReasonDescription(event.target.value);
  };

  const getCancelReasonList = async () => {
    try {
      const response = await axios_merchant.get(`bookings/cancel-reason-list`);
      setReasonList(response.data);
    } catch (error) {
      if (error) {
        setOpenSnack(true);
        setStatusSnack('error');
        setMessageSnack('Dữ liệu lý do hủy phòng hiện thời chưa có sẵn, vui lòng thử lại sau !');
      }
    }
  };

  const submitApprovedBooking = async (id: number) => {
    try {
      const res = await axios_merchant.put(`bookings/status-update/${id}?option=status`, {
        status: 2
      });
      setMessageSnack('Đơn đặt phòng được xác nhận thành công !');
      setOpenSnack(true);
      getBookingListST(dispatch, {});
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được xác nhận !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };

  const confirmCancelBooking = async (id: number) => {
    try {
      const res = await axios_merchant.post(`bookings/cancel-booking/${id}`, {
        code: reason,
        note: reasonDescription
      });
      if (res) {
        setOpenCancel(0);
        setMessageSnack('Đơn đặt phòng được hủy thành công !');
        setOpenSnack(true);
        getBookingListST(dispatch, {});
      }
    } catch (error) {
      if (error) {
        setMessageSnack('Đơn đặt phòng chưa được hủy !');
        setStatusSnack('error');
        setOpenSnack(true);
      }
    }
  };
  const handleSearchST = () => {
    changePage(1);
    getBookingListST(dispatch, {
      nameSearch: searchName,
      date_start: startDate,
      date_end: endDate,
      status: statusBooking,
      room_id: room_id,
      booking_code: codeBooking
    });
  };
  return (
    <Fragment>
      <FilterBookingList handleSearch={handleSearchST} />
      {useMemo(
        () =>
          !isEmpty ? (
            <Fragment>
              <Grid container item xs={12}>
                <Table aria-label="simple table">
                  <colgroup>
                    <Hidden smDown>
                      <col width="10%" />
                    </Hidden>
                    <Hidden smDown>
                      <col width="20%" />
                    </Hidden>
                    <col width="20%" />
                    <Hidden xsDown>
                      <col width="20%" />
                      <col width="20%" />
                      <col width="10%" />
                    </Hidden>
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <Hidden smDown>
                        <TableCell className={classes.tableCell}>Mã booking</TableCell>
                      </Hidden>
                      <TableCell className={classes.tableCell}>Khách hàng</TableCell>
                      <Hidden smDown>
                        <TableCell align="center" className={classes.tableCell}>
                          <Typography variant="subtitle2" className={classes.name}>
                            Ngày đến
                          </Typography>
                          <Typography variant="subtitle2" className={classes.name}>
                            Ngày đi
                          </Typography>
                        </TableCell>
                      </Hidden>
                      <Hidden xsDown>
                        <TableCell className={classes.tableCell}>Phòng</TableCell>
                      </Hidden>
                      <Hidden xsDown>
                        <TableCell className={classes.tableCell}>Thanh toán</TableCell>
                        <TableCell className={classes.tableCell}>Trạng thái</TableCell>
                      </Hidden>
                    </TableRow>
                  </TableHead>
                  {bookinglist ? (
                    <TableBody>
                      {bookinglist.map((booking, i) => (
                        <TableRow key={i} className={classes.tableRow}>
                          <Hidden smDown>
                            <TableCell className={classes.tableValue}>#{booking.uuid}</TableCell>
                          </Hidden>
                          <TableCell className={classes.tableValue}>
                            <Grid item xs={12} className={classes.wrapperPaymentXs}>
                              <Typography variant="subtitle2" className={classes.customerName}>
                                <Hidden smUp>
                                  <span>
                                    {booking.status === 5 && (
                                      <span className={classes.statusBookCancel}>
                                        {booking.status_txt}
                                      </span>
                                    )}
                                    {booking.status === 1 && (
                                      <span className={classes.statusBookWaiting}>
                                        {' '}
                                        {booking.status_txt}
                                      </span>
                                    )}
                                    {booking.status !== 1 && booking.status !== 5 && (
                                      <span className={classes.statusBookSuccess}>
                                        {booking.status_txt}
                                      </span>
                                    )}
                                    <span> - </span>
                                  </span>
                                </Hidden>
                                {booking.name} - {booking.number_of_guests} khách
                              </Typography>
                              <Hidden smUp>
                                <IconButton
                                  className={classes.moreIcon}
                                  onClick={() => handleClickOpen(booking.id)}
                                  size="small"
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true">
                                  <MoreVertIcon />
                                </IconButton>
                              </Hidden>
                            </Grid>
                            {booking.payment_status == 3 ? (
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                {booking.phone}
                              </Typography>
                            ) : (
                              <Typography variant="subtitle2" className={classes.notPayment}>
                                Thông tin sẽ được cung cấp sau khi khách hàng thanh toán
                              </Typography>
                            )}
                            <Hidden xsDown>
                              {booking.payment_status == 3 && (
                                <Typography variant="subtitle2" className={classes.valueNormal}>
                                  {booking.email}
                                </Typography>
                              )}
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                Ngày tạo: {booking.created_at.substring(11, 16)} -{' '}
                                {moment(booking.created_at).format('DD/MM/YYYY')}
                              </Typography>
                            </Hidden>
                            <Hidden mdUp>
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                Ngày đến: {moment(booking.checkin).format('DD/MM/YYYY')}
                              </Typography>
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                Ngày đi: {moment(booking.checkout).format('DD/MM/YYYY')}{' '}
                              </Typography>
                            </Hidden>
                            <Hidden smUp>
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                {booking.room.data.details.data[0].name}
                              </Typography>
                              <Typography variant="subtitle2" className={classes.customerName}>
                                {booking.payment_status === 0 && (
                                  <span className={classes.statusBookWaiting}>
                                    {' '}
                                    {booking.payment_status_txt}
                                  </span>
                                )}
                                {booking.payment_status === 3 && (
                                  <span className={classes.statusBookSuccess}>
                                    {' '}
                                    {booking.payment_status_txt}
                                  </span>
                                )}
                                {booking.payment_status !== 0 && booking.payment_status !== 3 && (
                                  <span className={classes.statusBookCancel}>
                                    {' '}
                                    {booking.payment_status_txt}
                                  </span>
                                )}
                                <span> - </span>
                                {numeral(booking.total_fee).format('0,0')} vnđ
                              </Typography>
                            </Hidden>
                            {booking.status === 1 && (
                              <Hidden smUp>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => submitApprovedBooking(booking.id)}
                                  className={classes.button}>
                                  Xác nhận
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleClickOpenCancel(booking.id)}
                                  className={classes.buttonCancel}>
                                  Hủy đơn
                                </Button>
                              </Hidden>
                            )}
                          </TableCell>
                          <Hidden smDown>
                            <TableCell align="center" className={classes.tableValue}>
                              {booking.booking_type === 1 ? (
                                <Typography variant="subtitle2">
                                  {booking.checkin.substring(11, 16)} &#8594;{' '}
                                  {booking.checkout.substring(11, 16)}
                                </Typography>
                              ) : (
                                <Typography variant="subtitle2">
                                  {moment(booking.checkin).format('DD/MM/YYYY')}
                                </Typography>
                              )}
                              <Typography variant="subtitle2" className={classes.valueNormal}>
                                {booking.booking_type === 1 ? '' : <span>&#8594;</span>}
                              </Typography>
                              <Typography variant="subtitle2">
                                {moment(booking.checkout).format('DD/MM/YYYY')}
                              </Typography>
                            </TableCell>
                          </Hidden>
                          <Hidden xsDown>
                            <TableCell className={classes.tableValue}>
                              <a href={`https://westay.vn/room/${booking.room_id}`} target="_blank">
                                {booking.room_id} - {booking.room.data.details.data[0].name}
                              </a>
                            </TableCell>
                            <TableCell className={classes.tableValue}>
                              <Grid item xs={12} className={classes.wrapperPayment}>
                                <Typography variant="subtitle2" className={classes.customerName}>
                                  {numeral(booking.total_fee).format('0,0')} vnđ
                                </Typography>
                                <Grid>
                                  <IconButton
                                    className={classes.moreIcon}
                                    onClick={() => handleClickOpen(booking.id)}
                                    size="small"
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true">
                                    <MoreVertIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                              {booking.payment_status === 0 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookWaiting}>
                                  {booking.payment_status_txt}
                                </Typography>
                              )}
                              {booking.payment_status === 3 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookSuccess}>
                                  {' '}
                                  {booking.payment_status_txt}
                                </Typography>
                              )}
                              {booking.payment_status !== 0 && booking.payment_status !== 3 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookCancel}>
                                  {booking.payment_status_txt}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell className={classes.tableValue}>
                              {booking.status === 5 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookCancel}>
                                  {booking.status_txt}
                                </Typography>
                              )}
                              {booking.status === 1 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookWaiting}>
                                  {' '}
                                  {booking.status_txt}
                                </Typography>
                              )}
                              {booking.status !== 1 && booking.status !== 5 && (
                                <Typography
                                  variant="subtitle2"
                                  className={classes.statusBookSuccess}>
                                  {booking.status_txt}
                                </Typography>
                              )}
                              {booking.status === 1 && (
                                <Fragment>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => submitApprovedBooking(booking.id)}
                                    className={classes.button}>
                                    Xác nhận
                                  </Button>
                                  <Button
                                    onClick={() => handleClickOpenCancel(booking.id)}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonCancel}>
                                    Hủy đơn
                                  </Button>
                                </Fragment>
                              )}
                            </TableCell>
                          </Hidden>
                          <Dialog
                            fullScreen={width === 'xs'}
                            maxWidth="sm"
                            open={open === booking.id}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                              <span className={classes.customerName}>
                                #{booking.uuid} - Chi tiết giá đặt phòng
                              </span>
                            </DialogTitle>
                            <DialogContent>
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2" className={classes.detailPrice}>
                                  Thông tin
                                </Typography>
                                <Typography variant="subtitle2" className={classes.detailPrice}>
                                  Giá
                                </Typography>
                              </Grid>
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2">Tiền phòng</Typography>
                                <Typography variant="subtitle2">
                                  {numeral(booking.price_original).format('0,0')} vnđ
                                </Typography>
                              </Grid>
                              <Divider className={classes.divider} />
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2">Phụ thu khách</Typography>
                                <Typography variant="subtitle2">
                                  {numeral(booking.additional_fee).format('0,0')} vnđ
                                </Typography>
                              </Grid>
                              <Divider className={classes.divider} />
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2">Giảm giá</Typography>
                                <Typography variant="subtitle2">
                                  {numeral(booking.price_discount).format('0,0')} vnđ
                                </Typography>
                              </Grid>
                              <Divider className={classes.divider} />
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2">Dọn dẹp</Typography>
                                <Typography variant="subtitle2">
                                  {numeral(booking.service_fee).format('0,0')} vnđ
                                </Typography>
                              </Grid>
                              <Divider className={classes.divider} />
                              <Grid item xs={12} className={classes.wrapperPaymentXs}>
                                <Typography variant="subtitle2">Tổng cộng</Typography>
                                <Typography variant="subtitle2">
                                  {numeral(booking.total_fee).format('0,0')} vnđ
                                </Typography>
                              </Grid>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleClose}
                                className={classes.button}
                                color="primary"
                                autoFocus>
                                Đóng
                              </Button>
                            </DialogActions>
                          </Dialog>

                          <Dialog
                            fullScreen={width === 'xs'}
                            maxWidth="sm"
                            open={openCancel === booking.id}
                            onClose={handleCloseCancel}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                              <span className={classes.customerName}>
                                #{booking.uuid} - Thông tin chi tiết hủy đặt phòng
                              </span>
                            </DialogTitle>
                            <DialogContent>
                              <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} className={classes.container}>
                                      <Typography
                                        className={classes.title}
                                        variant="h6"
                                        gutterBottom>
                                        Lý do bạn hủy đơn đặt phòng *
                                      </Typography>
                                      <FormControl variant="outlined" fullWidth>
                                        <Select
                                          fullWidth
                                          onChange={changeReason}
                                          value={reason}
                                          inputProps={{ style: { padding: 12 } }}
                                          input={<OutlinedInput labelWidth={0} />}
                                          MenuProps={{
                                            classes: { paper: classes.menuSelect }
                                          }}>
                                          {reasonList &&
                                            reasonList.map((o, idx) => (
                                              <MenuItem key={idx} value={o.id}>
                                                {o.value}
                                              </MenuItem>
                                            ))}
                                        </Select>
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </FormControl>
                              </Grid>
                              <Grid item className={classes.margin_top}>
                                <Typography className={classes.title} variant="h6" gutterBottom>
                                  Chi tiết (không bắt buộc)
                                </Typography>
                                <CardTextarea
                                  name="rules"
                                  value={reasonDescription}
                                  classTextField={'textarea'}
                                  rows={4}
                                  rowsMax={9}
                                  multiline={true}
                                  handleChange={handleChange}
                                />
                              </Grid>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseCancel}
                                className={classes.buttonCancel}
                                color="primary"
                                autoFocus>
                                Quay lại
                              </Button>
                              <Button
                                onClick={() => confirmCancelBooking(booking.id)}
                                className={classes.button}
                                color="primary"
                                autoFocus>
                                Đồng ý
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    ''
                  )}
                </Table>
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
              </Grid>
              {meta && (
                <Pagination
                  className="rooms-pagination"
                  total={meta.pagination.total}
                  locale={localeInfo}
                  pageSize={meta.pagination.per_page}
                  current={currentPage}
                  onChange={changePage}
                />
              )}
            </Fragment>
          ) : (
            <NotFoundGlobal
              height={300}
              width={250}
              content="Danh sách booking hiện tại chưa hiển thị, vui lòng đợi trong giây lát"
            />
          ),
        [open, openCancel, bookinglist, openSnack, reason, reasonDescription]
      )}
    </Fragment>
  );
};

export default ShortTermBookingList;
