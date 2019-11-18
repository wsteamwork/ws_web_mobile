import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { UpdateDetailsActions } from '@/store/Redux/Reducers/LTR/UpdateListing/updateDetails';
import { Button, Collapse, FormControl, InputAdornment, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
interface IProps {
  roomNumber?: number;
  bedRoomsList?: any;
  setBedroomsList?: Dispatch<SetStateAction<any>>;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      display: 'flex',
      alignItems: 'center'
    },
    area: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })
);

const UpdateAddBedRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { roomNumber, bedRoomsList } = props;
  const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const [single, setSingle] = useState<number>(0);
  const [double, setDouble] = useState<number>(0);
  const [king, setKing] = useState<number>(0);
  const [queen, setQueen] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  useEffect(() => {
    if (bedRoomsList && bedRoomsList[`bedroom_${roomNumber}`]) {
      setArea(bedRoomsList[`bedroom_${roomNumber}`][`area`]);
      bedRoomsList[`bedroom_${roomNumber}`]['beds'].map((item) => {
        switch (item.size) {
          case 1:
            setSingle(item.number_bed);
            break;
          case 2:
            setDouble(item.number_bed);
            break;
          case 3:
            setKing(item.number_bed);
            break;
          case 4:
            setQueen(item.number_bed);
            break;
          default:
            setSingle(0);
        }
      });
    }
  }, [bedRoomsList]);

  const totalBeds = single + double + king + queen;

  const [isAddBedRoom, setIsAddBedRoom] = useState<boolean>(false);
  const handleToggleAddBedRoom = () => {
    if (isAddBedRoom) {
      if (bedRoomsList.hasOwnProperty(`bedroom_${roomNumber}`)) {
        let bedsList = [];
        let bedRoomsListTemp = bedRoomsList;
        if (single > 0) bedsList.push({ number_bed: single, size: 1 });
        if (double > 0) bedsList.push({ number_bed: double, size: 2 });
        if (king > 0) bedsList.push({ number_bed: king, size: 3 });
        if (queen > 0) bedsList.push({ number_bed: queen, size: 4 });
        bedRoomsListTemp[`bedroom_${roomNumber}`].beds = bedsList;
        bedRoomsListTemp[`bedroom_${roomNumber}`][`number_bed`] = totalBeds;
        bedRoomsListTemp[`bedroom_${roomNumber}`][`area`] = area;

        dispatch({
          type: 'SET_BEDROOMS',
          payload: bedRoomsListTemp
        });
      }
    }
    setIsAddBedRoom(!isAddBedRoom);
  };

  const renderBedroomInfo = () => {
    let array = [];
    if (single > 0) array.push(`${single} giường đơn`);
    if (double > 0) array.push(`${double} giường đôi`);
    if (king > 0) array.push(`${king} giường king`);
    if (queen > 0) array.push(`${queen} giường queen`);
    return array.join(', ');
  };

  const changeArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea(parseInt(event.target.value));
  };
  return (
    <Fragment>
      {bedRoomsList ? (
        <Grid className="add-bedroom-container">
          <Grid container className="add-bedroom-container__wrapper">
            <Grid item xs={6} className="add-room-container__title">
              <h3>Phòng ngủ {roomNumber}</h3>
            </Grid>
            <Grid item xs={6} className="add-bedroom-container__counting">
              <p>
                {area} m<sup>2</sup>, {totalBeds} giường
              </p>
              {!isAddBedRoom ? <Grid>{renderBedroomInfo()}</Grid> : ' '}
            </Grid>

            <Grid item xs={12} className="counting-open">
              <Collapse in={isAddBedRoom}>
                <Grid item xs={8}>
                  <QuantityButtons
                    number={single}
                    setNumber={setSingle}
                    title={'Đơn'}></QuantityButtons>
                  <QuantityButtons
                    number={double}
                    setNumber={setDouble}
                    title={'Đôi'}></QuantityButtons>
                  <QuantityButtons
                    number={king}
                    setNumber={setKing}
                    title={'King'}></QuantityButtons>
                  <QuantityButtons
                    number={queen}
                    setNumber={setQueen}
                    title={'Queen'}></QuantityButtons>
                </Grid>
                <ValidatorForm
                  onSubmit={() => {
                    return null;
                  }}>
                  <Grid container item xs={8} className={classes.area}>
                    <Grid item xs={8}>
                      <Typography className={classes.title} variant="h6">
                        Diện tích
                      </Typography>
                    </Grid>
                    <Grid container item xs={4}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="price_day_helper"
                        required>
                        <TextValidator
                          validators={['required', 'isNumber']}
                          errorMessages={['Diện tích là bắt buộc', 'Diện tích là bắt buộc']}
                          name="price_day"
                          variant="outlined"
                          value={area}
                          onChange={changeArea}
                          InputProps={{
                            inputComponent: NumberFormatCustom as any,
                            endAdornment: (
                              <InputAdornment position="start">
                                m<sup>2</sup>
                              </InputAdornment>
                            )
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ValidatorForm>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <Button className="add-room-button" onClick={handleToggleAddBedRoom}>
                {isAddBedRoom ? 'Xác nhận' : 'Cập nhật'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
          ''
        )}
    </Fragment>
  );
};

export default UpdateAddBedRoom;
