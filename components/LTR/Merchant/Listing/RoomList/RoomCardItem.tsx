import DialogAddRoomToBuilding from '@/components/LTR/Merchant/Listing/RoomList/DialogAddRoomToBuilding';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { faBath, faBed, faDoorOpen, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createStyles, Divider, Grid, Hidden, IconButton, Link, Paper, Snackbar, Theme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIconOutlined from '@material-ui/icons/AddOutlined';
import EditIconOutlined from '@material-ui/icons/EditOutlined';
import FileCopyIconOutlined from '@material-ui/icons/FileCopyOutlined';
import ApartmentRoundedIcon from '@material-ui/icons/LocationCityRounded';
import { makeStyles, withStyles } from '@material-ui/styles';
import numeral from 'numeral';
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface IProps {
  classes?: any;
  room: any;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0'
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
      borderRadius: 16,
      boxShadow: '0 2px 9px -2px rgba(132,135,138,.2)'
    },
    title: {
      fontWeight: 600
    },
    content: {
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center'
    },
    img: {
      display: 'block',
      width: 140,
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '10px'
    },
    imgDefault: {
      width: 140,
      height: 40,
      margin: 'auto'
    },
    widthImg: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8,
        maxHeight: 94
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 160,
        maxHeight: 105
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: 117
      }
    },
    wrapperImage: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: 140
      },
      [theme.breakpoints.down('sm')]: {
        height: 117
      },
      [theme.breakpoints.down('xs')]: {
        height: 94
      },
      backgroundColor: '#3d5c5c',
      border: '1px solid #ffffff',
      borderRadius: '10px'
    },
    roomName: {
      fontSize: '1.2rem',
      display: 'inline-block',
      color: '#48465b',
      fontWeight: 600,
      alignItems: 'center',
      marginRight: '0.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
      }
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceDay: {
      display: 'flex',
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    priceAll: {
      display: 'flex',
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    link: {
      color: '#484848'
    },
    infoRoomName: {
      display: 'flex',
      margin: '5px 0'
    },
    vertifiredMdDown: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        alignItems: 'flex-start'
      }
    },
    iconVerified: {
      width: '23px',
      float: 'inherit',
      position: 'relative',
      top: 5,
      left: 5
    },
    spanIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    marginLabel: {
      margin: '16px 0'
    },
    wrapperIcon: {
      maxWidth: 140
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
    IconImage: {
      backgroundColor: '#E1E8F7',
      color: '#3E93F8',
      padding: 8,
      marginLeft: 8,
      '&:hover': {
        background: '#3E93F8',
        color: '#fff'
      }
    },
    sizeImage: {
      width: '1.5rem',
      height: '1.5rem'
    },
    customIcon: {
      color: '#484848'
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    sizeButton: {
      [theme.breakpoints.down('md')]: {
        width: '0.9rem',
        height: '0.9rem'
      }
    },
    process: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start'
      }
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
    marginProcess: {
      marginRight: '10px'
    },
    IconDetail: {
      color: 'lightgray'
    },
    subLabel: {
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      }
    },
    btnShowSmUp: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'flex-end'
    },
    percent: {
      fontWeight: 600
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
  })
);
const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { room } = props;
  const [open, setOpen] = useState(false);
  const [openById, setOpenById] = useState(false);
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => {
    setOpen(false);
    setTimeout(location.reload.bind(location), 1000);
  };
  const BorderLinearProgress = withStyles({
    root: {
      height: 6,
      width: 300,
      backgroundColor: '#ededed',
      borderRadius: 30
    },
    bar: {
      borderRadius: 30,
      backgroundColor: '#43cab8'
    }
  })(LinearProgress);
  const openUpdateRoom = (
    room_id: number,
    percent_longterm: number,
    lease_type: number,
    percent_shortterm: number
  ) => {
    if (lease_type !== 1) {
      if (percent_longterm == 100) {
        window.open(`/host/update-listing/${room_id}`, `_blank`);
      } else {
        window.open(`/host/create-listing/${room_id}/process`, `_blank`);
      }
    } else if (lease_type == 1) {
      if (percent_shortterm == 100) {
        window.open(`/host/update-listing/${room_id}`, `_blank`);
      } else {
        window.open(`/host/create-listing/${room_id}/process`, `_blank`);
      }
    }
  };

  const openLongTermRoomUpdateFirstTime = (room_id: number) => {
    window.open(`/host/create-listing/${room_id}/process`, `_blank`);
  };
  const openPreviewRoomShortTerm = (room_id: number, status: number) => {
    status != 1
      ? window.open(`/preview-room/${room_id}`, `_blank`)
      : window.open(`/room/${room_id}`, `_blank`);
  };
  const openPreviewRoomLongTerm = (room_id: number, status: number) => {
    status != 1
      ? window.open(`/preview-long-term-room/${room_id}`, `_blank`)
      : window.open(`/long-term-room/${room_id}`, `_blank`);
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        <Grid item xs={11} sm={11} md={10} lg={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  {room.avatar && room.avatar.images.length ? (
                    <Grid item xs={6} sm={3} md={3} lg={2} className={classes.widthImg}>
                      <img
                        className={classes.img}
                        src={IMAGE_STORAGE_LG + room.avatar.images[0].name}
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
                    <Grid item xs={6} className={classes.btnShowSmUp}>
                      <Grid item>
                        <Tooltip
                          title={t('roomlist:tooltipUpdateRoom')}
                          placement="bottom"
                          classes={{ tooltip: 'tooltip' }}>
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="Edit"
                            onClick={() =>
                              openUpdateRoom(
                                room.id,
                                room.percent,
                                room.lease_type,
                                room.short_term_room.percent
                              )
                            }>
                            <EditIconOutlined className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title={t('roomlist:addToBuilding')}
                          placement="bottom"
                          classes={{ tooltip: 'tooltip' }}>
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="Edit"
                            onClick={() => setOpenById(!openById)}>
                            <ApartmentRoundedIcon className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title={t('roomlist:duplicateListing')}
                          placement="bottom"
                          classes={{ tooltip: 'tooltip' }}>
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="dupicate"
                            onClick={() => setOpenDuplicate(true)}>
                            <FileCopyIconOutlined className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      {room.percent < 100 ? (
                        <Grid item>
                          <Tooltip
                            title={t('roomlist:tooltipUpdateRoomLongTerm')}
                            placement="bottom"
                            classes={{ tooltip: 'tooltip' }}>
                            <IconButton
                              color="primary"
                              className={classes.IconButton}
                              aria-label="Edit"
                              onClick={() => openLongTermRoomUpdateFirstTime(room.id)}>
                              <AddIconOutlined className={classes.sizeButton} />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      ) : (
                          ''
                        )}
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={9} md={9} lg={10}>
                    <Grid className={classes.content}>
                      <Grid container>
                        <Grid item xs={12} sm={8} className={classes.infoRoomName}>
                          <span>
                            <Link
                              href={`/room/${room.room_id}`}
                              className={classes.roomName}
                              target="_blank">
                              {room.about_room ? room.about_room.name : t('roomlist:noNameRoom')}
                              {room.short_term_room.status === 1 ? (
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
                              ) : (
                                  ''
                                )}
                            </Link>
                          </span>
                        </Grid>
                        <Hidden xsDown>
                          <Grid container item xs={4} justify="flex-end">
                            <Grid item>
                              <Tooltip
                                title={t('roomlist:tooltipUpdateRoom')}
                                placement="bottom"
                                classes={{ tooltip: 'tooltip' }}>
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="Edit"
                                  onClick={() =>
                                    openUpdateRoom(
                                      room.id,
                                      room.percent,
                                      room.lease_type,
                                      room.short_term_room.percent
                                    )
                                  }>
                                  <EditIconOutlined className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip
                                title={t('roomlist:addToBuilding')}
                                placement="bottom"
                                classes={{ tooltip: 'tooltip' }}>
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="Edit"
                                  onClick={() => setOpenById(!openById)}>
                                  <ApartmentRoundedIcon className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip
                                title={t('roomlist:duplicateListing')}
                                placement="bottom"
                                classes={{ tooltip: 'tooltip' }}>
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="duplicate"
                                  onClick={() => setOpenDuplicate(true)}>
                                  <FileCopyIconOutlined className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            {room.percent < 100 ? (
                              <Grid item>
                                <Tooltip
                                  title={t('roomlist:tooltipUpdateRoomLongTerm')}
                                  placement="bottom"
                                  classes={{ tooltip: 'tooltip' }}>
                                  <IconButton
                                    color="primary"
                                    className={classes.IconButton}
                                    aria-label="Edit"
                                    onClick={() => openLongTermRoomUpdateFirstTime(room.id)}>
                                    <AddIconOutlined className={classes.sizeButton} />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            ) : (
                                ''
                              )}
                          </Grid>
                        </Hidden>
                      </Grid>
                      {room.apartment_building_id && (
                        <Grid className={classes.price}>
                          <Grid container item xs={12} sm={12} lg={10}>
                            <Typography variant="body1" className={classes.priceAll}>
                              {t('roomlist:buildingTitle')}: {room.apartment_building},{' '}
                              {room.address}
                              {room.district_name ? ', ' + room.district_name + ',' : ''}{' '}
                              {room.city_name ? room.city_name : ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                      <Grid className={classes.price}>
                        <Grid container item xs={12} sm={12} lg={10} spacing={1}>
                          <Grid item xs={6} sm={3} lg={6} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon className={classes.customIcon} icon={faDoorOpen} />
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.total_area} m<sup>2</sup>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faUserFriends}
                                />
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.guests
                                    ? room.guests.recommendation + room.guests.max_additional_guest
                                    : '0'}{' '}
                                  {t('roomlist:numberGuest')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={6} sm={3} lg={6} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon className={classes.customIcon} icon={faBed} />
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.bedrooms ? room.bedrooms.number_bedroom : '0'}{' '}
                                  {t('roomlist:numberBedroom')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon className={classes.customIcon} icon={faBath} />
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.bathrooms ? room.bathrooms.number_bathroom : '0'}{' '}
                                  {t('roomlist:numberBathroom')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container item xs={12} sm={12} lg={10} spacing={1}>
                          <Grid item xs={6} sm={3} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={8} className={classes.spanIcon}>
                                Total Listing:
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={4}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.number_of_listing}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* <Grid item xs={6} sm={3} xl={4} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={8} className={classes.spanIcon}>
                                Available Listing:
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={4}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.number_of_listing}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid> */}
                          <Grid item xs={6} sm={3} xl={4} className={classes.wrapperIcon}></Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={8} className={classes.infoRoomName}>
                          {room.short_term_room.rent_type === 3 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  {t('roomlist:onePerMonth')} &#8226;
                                </span>
                              ) : (
                                  ''
                                )}
                              {room.short_term_room.rent_type !== 1 ? (
                                <span>
                                  &nbsp;
                                  {numeral(room.short_term_room.price_day).format('0,0')} vnđ{' '}
                                  {t('roomlist:onePerDay')}
                                  &nbsp;&#8226;
                                </span>
                              ) : (
                                  ''
                                )}
                              {(room.short_term_room.rent_type !== 2 && room.short_term_room.price_hour !== 0) ? (
                                <span>
                                  &nbsp;
                                  {numeral(room.short_term_room.price_hour).format('0,0')} vnđ{' '}
                                  {t('roomlist:onePerHour')}
                                </span>
                              ) : (
                                  ''
                                )}
                            </Typography>
                          ) : (
                              ''
                            )}
                          {room.short_term_room.rent_type === 2 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  {t('roomlist:onePerMonth')} &nbsp;&#8226;
                                </span>
                              ) : (
                                  ''
                                )}
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_day).format('0,0')} vnđ/{' '}
                                {t('roomlist:onePerDay')}
                              </span>
                            </Typography>
                          ) : (
                              ''
                            )}
                          {room.short_term_room.rent_type === 1 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  {t('roomlist:onePerMonth')} &nbsp;&#8226;
                                </span>
                              ) : (
                                  ''
                                )}
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_hour).format('0,0')} vnđ/{' '}
                                {t('roomlist:onePerHour')}
                              </span>
                            </Typography>
                          ) : (
                              ''
                            )}
                        </Grid>
                        {room.lease_type !== 1 ? (
                          room.percent < 100 ? (
                            <Grid container item xs={12} lg={4}>
                              <Grid item xs={12} className={classes.process}>
                                <BorderLinearProgress
                                  className={classes.marginProcess}
                                  variant="determinate"
                                  color="secondary"
                                  value={room.percent}
                                />
                                <span className={classes.percent}> {room.percent}%</span>
                              </Grid>
                            </Grid>
                          ) : (
                              ''
                            )
                        ) : room.lease_type !== 2 && room.lease_type !== 3 ? (
                          room.short_term_room.percent < 100 ? (
                            <Grid container item xs={12} lg={4}>
                              <Grid item xs={12} className={classes.process}>
                                <BorderLinearProgress
                                  className={classes.marginProcess}
                                  variant="determinate"
                                  color="secondary"
                                  value={room.short_term_room.percent}
                                />
                                <span className={classes.percent}>
                                  {' '}
                                  {room.short_term_room.percent}%
                                </span>
                              </Grid>
                            </Grid>
                          ) : (
                              ''
                            )
                        ) : (
                              ''
                            )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/house.svg'}
                        alt="House"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        {t('roomlist:roomType')}
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.accommodation_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/rentType.svg'}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Xem phòng ngắn hạn`}
                        style={{ cursor: 'pointer' }}>
                        <Typography
                          variant="subtitle1"
                          className={classes.priceDay}
                          onClick={() =>
                            openPreviewRoomShortTerm(room.room_id, room.short_term_room.status)
                          }>
                          {t('roomlist:shortTerm')}
                          <img
                            src={'/static/preview.svg'}
                            width={16}
                            height={16}
                            style={{ marginLeft: 4 }}
                          />
                        </Typography>
                      </HtmlTooltip>

                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.short_term_rent_type.rent_type === 3
                          ? t('roomlist:dayAndHour')
                          : room.short_term_rent_type.rent_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/longterm.svg'}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <HtmlTooltip
                        placement="bottom-end"
                        title={`Xem phòng dài hạn`}
                        style={{ cursor: 'pointer' }}>
                        <Typography
                          variant="subtitle1"
                          className={classes.priceDay}
                          onClick={() => openPreviewRoomLongTerm(room.id, room.status)}>
                          {t('roomlist:longTerm')}
                          <img
                            src={'/static/preview.svg'}
                            width={16}
                            height={16}
                            style={{ marginLeft: 4 }}
                          />
                        </Typography>
                      </HtmlTooltip>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.status === 0 ? t('roomlist:locked') : t('roomlist:byMonth')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={
                          room.instant_book === 1
                            ? '/static/images/flash.svg'
                            : '/static/images/flashWhite.svg'
                        }
                        alt="Flash"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        {t('roomlist:rentType')}
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.instant_book_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <HtmlTooltip
                    placement="bottom-end"
                    title={room.short_term_room.settings.booking_cancel_text}>
                    <Grid container>
                      <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                        <img
                          src={'/static/images/policy.svg'}
                          alt="Policy"
                          className={classes.imgDetail}
                        />
                      </Grid>
                      <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                        <Typography variant="subtitle1" className={classes.priceDay}>
                          {t('roomlist:policy')}
                        </Typography>
                        <Typography variant={'body1'} className={classes.subLabel}>
                          {room.short_term_room.settings.booking_cancel_type_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </HtmlTooltip>
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
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <MySnackbarContentWrapper variant="success" message={message} onClose={handleClose} />
      </Snackbar>
      <DialogAddRoomToBuilding
        isDuplicate={false}
        room={room}
        open={openById}
        handleClose={() => setOpenById(false)}
        roomID={room.id}
      />
      <DialogAddRoomToBuilding
        isDuplicate={true}
        room={room}
        open={openDuplicate}
        handleClose={() => setOpenDuplicate(false)}
        roomID={room.id}
      />
    </Fragment>
  );
};
export default RoomCardItem;
