import { TransitionCustom } from '@/components/Book/BookingForm';
import ButtonGlobal from '@/components/ButtonGlobal';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { AddToBuildingReq, RoomToBuildingReq } from '@/types/Requests/LTR/CreateListing/StoreRoomWithinBuilding/RoomWithinBuilding';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { axios_merchant } from '@/utils/axiosInstance';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, fade, Grid, IconButton, InputBase, Snackbar, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { Autocomplete } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

interface IProps {
  classes?: any,
  open: boolean,
  handleClose: () => void,
  buildingID: any,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px 24px',
      borderRadius: 16,
      minWidth: 700,
      overflowY: 'unset',
      [theme.breakpoints.down('xs')]: {
        minWidth: '100%',
      },
    },
    boxTitle: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    boxContent: {
      minHeight: 64,
      padding: 0,
      overflowY: 'unset'
    },
    boxAction: {
      justifyContent: 'space-around',
      marginTop: 16
    },
    root2: {
      width: 221,
      fontSize: 13,
    },
    inputBase: {
      padding: 10,
      width: '100%',
      '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontSize: 14,
        border: '1px solid #ced4da',
        '&:focus': {
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    paper: {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      margin: 0,
      color: '#586069',
      fontSize: 13,
    },
    iconSelected: {
      width: 17,
      height: 17,
      marginRight: 5,
      marginLeft: -2,
    },
    text: {
      flexGrow: 1,
    },
    close: {
      opacity: 0.6,
      width: 18,
      height: 18,
    },
  })
);

const DialogInfoBuildingAndAddRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { open, handleClose, buildingID } = props;
  const { width } = useContext(GlobalContext);
  const [choosedRoom, setChoosedRoom] = useState<LTRoomIndexRes[]>([]);
  const [roomList, setRoomList] = useState<LTRoomIndexRes[]>([]);
  const [pendingValue, setPendingValue] = useState<LTRoomIndexRes[]>([]);
  const [dataRoomObject, setDataRoomObject] = useState<RoomToBuildingReq[]>([]);
  const [openInput, setOpenInput] = useState(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('');
  const [statusSnack, setStatusSnack] = useState<any>('success');
  const { t } = useTranslation();

  const getRoomList = async () => {
    try {
      const res = await axios_merchant.get(`long-term-rooms?building_id=${buildingID}`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getRoomList()
      .then((res) => {
        setRoomList(res.data);
      });
  }, []);

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleCloseSearch = () => {
    const objRoom: RoomToBuildingReq[] = [];

    setChoosedRoom(pendingValue);
    pendingValue.map((o, i) => {
      objRoom.push({
        id: o.id,
        room_number: dataRoomObject.length == 0 ? '' : dataRoomObject[i] ? dataRoomObject[i].room_number : '',
        floor: dataRoomObject.length == 0 ? '' : dataRoomObject[i] ? dataRoomObject[i].floor : '',
      });
    });
    setDataRoomObject(objRoom);
    setOpenInput(false);
  };

  const handleChange = (i: number, filed: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dataRoomObject[i][filed] = event.target.value;
    let newdata = [...dataRoomObject];
    setDataRoomObject(newdata);
  };

  const handleSubmit = () => {
    const data: AddToBuildingReq = {
      apartment_building_id: buildingID,
      list_long_term_room: dataRoomObject
    };

    axios_merchant
      .put('long-term/room/add-to-building', data)
      .then(() => {
        setStatusSnack('success');
        setMessageSnack(t('roomlist:addedToBuildingSucsses'));
        setOpenSnack(true);
        handleClose();
        window.location.reload();
      })
      .catch(() => {
        setStatusSnack('error');
        setMessageSnack(t('roomlist:addedToBuildingError'));
        setOpenSnack(true);
      });
  };

  return (
    <Fragment>
      <Dialog aria-labelledby='dialog-info-and-add-to-building'
        scroll='body'
        maxWidth={'md'} fullWidth={width === 'xs'}
        TransitionComponent={TransitionCustom}
        fullScreen={width === 'xs'}
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root }}
      >
        <DialogTitle disableTypography className={classes.boxTitle}>
          <Typography variant='h6'>{t('roomlist:buildingInfo')}</Typography>
          <IconButton aria-label='close' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.boxContent}>
          <Grid container alignItems='center'>
            <Grid item xs={8} sm={9}>
              <Autocomplete
                open={openInput}
                onOpen={() => {
                  setPendingValue(choosedRoom);
                  setOpenInput(true);
                }}
                onClose={handleCloseSearch}
                multiple
                classes={{
                  paper: classes.paper,
                }}
                value={pendingValue}
                onChange={(event, newValue) => {
                  setPendingValue(newValue);
                }}
                disableCloseOnSelect
                disablePortal
                renderTags={() => null}
                noOptionsText={t('room:notFoundResource')}
                renderOption={(o: LTRoomIndexRes, { selected }) => (
                  <Fragment>
                    <DoneIcon
                      className={classes.iconSelected}
                      style={{ visibility: selected ? 'visible' : 'hidden' }}
                    />

                    <div className={classes.text}>
                      {o.id}
                      <br />
                      {o.about_room && o.about_room.name ? o.about_room.name : t('basic:notHaveInfo')}
                    </div>
                    <CloseIcon
                      className={classes.close}
                      style={{ visibility: selected ? 'visible' : 'hidden' }}
                    />
                  </Fragment>
                )}
                options={[...roomList].sort((a, b) => {
                  // Display the selected labels first.
                  let ai = choosedRoom.indexOf(a);
                  ai = ai === -1 ? choosedRoom.length + roomList.indexOf(a) : ai;
                  let bi = choosedRoom.indexOf(b);
                  bi = bi === -1 ? choosedRoom.length + roomList.indexOf(b) : bi;
                  return ai - bi;
                })}
                getOptionLabel={(o: LTRoomIndexRes) => (o.about_room && o.about_room.name ? o.about_room.name : t('basic:notHaveInfo'))}
                renderInput={params => (
                  <InputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    className={classes.inputBase}
                    placeholder={t('basic:searchForYourApartment')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <Box className={classes.inputBase}>
                <Button variant="outlined" color="primary" onClick={handleCloseSearch} fullWidth>
                  {t('host:confirm')}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider />

          <Box p={2}>
            <ValidatorForm onSubmit={handleSubmit}>
              {choosedRoom.map((o: LTRoomIndexRes, i) => (
                <Box key={i} my={4}>
                  <Grid container spacing={1} alignItems='center'>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle2'>
                        {o.about_room && o.about_room.name ? o.about_room.name : t('basic:notHaveInfo')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextValidator
                        label={t('roomlist:idRoom')}
                        validators={['required']}
                        errorMessages={[
                          t('basic:fieldRequierd')
                        ]}
                        variant="outlined"
                        value={dataRoomObject[i].room_number}
                        onChange={handleChange(i, 'room_number')}
                        size='small'
                        InputProps={{
                          placeholder: "Exp: 101, A202,...",
                          // defaultValue: dataRoomObject[i].room_number
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextValidator
                        label={t('roomlist:whichFloor')}
                        validators={['required']}
                        errorMessages={[
                          t('basic:fieldRequierd')
                        ]}
                        variant="outlined"
                        value={dataRoomObject[i].floor}
                        onChange={handleChange(i, 'floor')}
                        size='small'
                        InputProps={{
                          placeholder: "Exp: 10, 12 tòa A",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              {choosedRoom.length ? (
                <Box my={1} textAlign="center">
                  <ButtonGlobal
                    className={classes.customBtn}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    width="auto">
                    {t('basic:addRoomtoBuilding')}
                  </ButtonGlobal>
                </Box>
              ) : ''}
            </ValidatorForm>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <MySnackbarContentWrapper
          variant={statusSnack}
          message={messageSnack}
          onClose={handleCloseSnack}
        />
      </Snackbar>
    </Fragment>
  );
};

export default DialogInfoBuildingAndAddRooms;
