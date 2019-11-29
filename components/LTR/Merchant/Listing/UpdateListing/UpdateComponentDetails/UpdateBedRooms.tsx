import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { getDataUpdateListing, UpdateDetailsActions, UpdateDetailsState } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import { OutlinedInput, Select, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { KeyboardArrowDown } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import UpdateAddBedRoom from './UpdateAddBedRoom';
interface IProps { }
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(3)
    },
  })
);

const UpdateBedRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>("Cập nhật thành công");
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const { room_id, bedRoomsNumber, bedRooms } = useSelector<ReducersList, UpdateDetailsState>(
    (state) => state.updateDetails
  );
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [bedRoomsList, setBedRoomsList] = useState<BedRoomReq>(bedRooms);
  useEffect(() => {
    getDataUpdateListing(id, dispatch);
  }, [room_id]);

  useEffect(() => {
    setBedRoomsList(bedRooms);
  }, [bedRooms]);

  const bedRoomsNumberArray = (length: number) =>
    Array.from(new Array(length), (val: any, index: number) => ++index);

  // const callBackOnChange = (value: any) => {
  //   dispatch({
  //     type: 'SET_BEDROOMS_NUMBER',
  //     payload: parseInt(value)
  //   });
  //   bedRoomsList['number_bedroom'] = parseInt(value);
  //   let bedRoomsTemp: any = {};
  //   if (bedRoomsNumber < parseInt(value)) {
  //     for (let i = bedRoomsNumber + 1; i <= parseInt(value); i++) {
  //       bedRoomsTemp[`bedroom_${i}`] = {
  //         number_bed: 0,
  //         images: [],
  //         beds: [],
  //         area: 0
  //       };
  //     }
  //     let newRoomsList = Object.assign({}, bedRoomsList, bedRoomsTemp);
  //     setBedRoomsList(newRoomsList);
  //   } else {
  //     for (let i = 1; i <= parseInt(value); i++) {
  //       bedRoomsTemp[`bedroom_${i}`] = bedRoomsList[`bedroom_${i}`];
  //     }
  //     bedRoomsTemp['number_bedroom'] = parseInt(value);
  //     setBedRoomsList(bedRoomsTemp);
  //     dispatch({
  //       type: 'SET_BEDROOMS',
  //       payload: bedRoomsTemp
  //     });
  //   }
  // };
  const callBackOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    dispatch({
      type: 'SET_BEDROOMS_NUMBER',
      payload: parseInt(value)
    });
    bedRoomsList['number_bedroom'] = parseInt(value);
    let bedRoomsTemp: any = {};
    if (bedRoomsNumber < parseInt(value)) {
      for (let i = bedRoomsNumber + 1; i <= parseInt(value); i++) {
        bedRoomsTemp[`bedroom_${i}`] = {
          number_bed: 0,
          images: [],
          beds: [],
          area: 0
        };
      }
      let newRoomsList = Object.assign({}, bedRoomsList, bedRoomsTemp);
      setBedRoomsList(newRoomsList);
    } else {
      for (let i = 1; i <= parseInt(value); i++) {
        bedRoomsTemp[`bedroom_${i}`] = bedRoomsList[`bedroom_${i}`];
      }
      bedRoomsTemp['number_bedroom'] = parseInt(value);
      setBedRoomsList(bedRoomsTemp);
      dispatch({
        type: 'SET_BEDROOMS',
        payload: bedRoomsTemp
      });
    }
  };
  const UpdateBedRooms: any = () => {
    const res = handleUpdateListing(room_id, {
      bedrooms: bedRooms
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật phòng ngủ thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật phòng ngủ căn hộ thất bại !")
    }
  };
  const optionsRender = (options, unit) => {
    return options.map((item, i) => {
      return (
        <option key={i} value={unit ? item : item.id}>
          {unit ? item + unit : item.value}
        </option>
      );
    });
  };
  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate handleSave={UpdateBedRooms} openSnack={openSnack} messageSnack={messageSnack} statusSnack={statusSnack} handleCloseSnack={handleCloseSnack}>
        <div className="step1-tab2-room">
          <Grid style={{ paddingRight: 10 }}>
            <Typography variant="h1" gutterBottom className="label main_label">
              Phòng ngủ
            </Typography>
            {/* <SelectCustom
              value={bedRoomsNumber}
              callBackOnChange={callBackOnChange}
              unit={' phòng ngủ'}
              title="Bạn có thể cung cấp bao nhiêu phòng ngủ cho khách ?"
              options={bedRoomsNumberArray(50)}
              twoThirdWidth={true}
            /> */}
            <Typography variant="subtitle1">
              Vui lòng chọn số phòng ngủ chính xác cho căn hộ của bạn
            </Typography>
            <Select
              native
              fullWidth
              classes={{ icon: 'icon' }}
              onChange={callBackOnChange}
              value={bedRoomsNumber}
              input={
                <OutlinedInput
                  name="term-rental"
                  labelWidth={0}
                  id="outlined-term-rental-native-simple"
                />
              }
              displayEmpty
              IconComponent={KeyboardArrowDown}>
              {optionsRender(bedRoomsNumberArray(50), ' phòng')}
            </Select>
          </Grid>

          <Grid className={classes.margin}>
            <Typography variant="h1" gutterBottom className="label main_label">
              Sắp xếp chỗ ngủ
            </Typography>
            <Grid item className="normal_text">
              <span>Cung cấp chi tiết về chỗ ngủ sẽ giúp khách có được sự lựa chọn tốt hơn</span>
            </Grid>
          </Grid>
          {_.times(bedRoomsNumber, (i) => (
            <UpdateAddBedRoom
              key={i}
              roomNumber={i + 1}
              bedRoomsList={bedRoomsList}
              setBedroomsList={setBedRoomsList}
            />
          ))}
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateBedRooms;
