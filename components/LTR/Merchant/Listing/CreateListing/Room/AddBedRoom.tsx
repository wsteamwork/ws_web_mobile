import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import { Button, Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
interface IProps {
  roomNumber?: number;
  bedRoomsList?: any;
  setBedroomsList?: Dispatch<SetStateAction<BedRoomReq>>;
  // setTotalBedsNumber?: Dispatch<SetStateAction<any>>;
  setErrorsBedsNumber?: Dispatch<SetStateAction<boolean>>;
}

const BedRoom: FC<IProps> = (props) => {
  const { roomNumber, bedRoomsList, setErrorsBedsNumber, setBedroomsList } = props;
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [single, setSingle] = useState<number>(0);
  const [double, setDouble] = useState<number>(0);
  const [king, setKing] = useState<number>(0);
  const [queen, setQueen] = useState<number>(0);
  const totalBeds = [single, double, king, queen].reduce((a, b) => a + b, 0);

  const [isAddBedRoom, setIsAddBedRoom] = useState<boolean>(false);

  // useEffect(() => {}, [totalBeds]);
  useEffect(() => {
    if (bedRoomsList && bedRoomsList[`bedroom_${roomNumber}`]) {
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

  const handleToggleAddBedRoom = () => {
    if (isAddBedRoom) {
      if (bedRoomsList.hasOwnProperty(`bedroom_${roomNumber}`)) {
        let bedsList = [];
        let bedRoomsListTemp: BedRoomReq = JSON.parse(JSON.stringify(bedRoomsList));
        // console.log('bedRoomsListTemp', bedRoomsListTemp);
        if (single > 0) bedsList.push({ number_bed: single, size: 1 });
        if (double > 0) bedsList.push({ number_bed: double, size: 2 });
        if (king > 0) bedsList.push({ number_bed: king, size: 3 });
        if (queen > 0) bedsList.push({ number_bed: queen, size: 4 });
        bedRoomsListTemp[`bedroom_${roomNumber}`].beds = bedsList;
        bedRoomsListTemp[`bedroom_${roomNumber}`][`number_bed`] = totalBeds;

        dispatch({
          type: 'SET_BEDROOMS',
          payload: bedRoomsListTemp
        });
        setBedroomsList(bedRoomsListTemp);
        setErrorsBedsNumber(true);
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
  return (
    <Grid className="add-bedroom-container">
      <Grid container className="add-bedroom-container__wrapper">
        <Grid item xs={6} className="add-room-container__title">
          <h3>Phòng ngủ {roomNumber}</h3>
        </Grid>
        <Grid item xs={6} className="add-bedroom-container__add-room">
          <Button className="add-room-button" onClick={handleToggleAddBedRoom}>
            {isAddBedRoom ? 'Xác nhận' : 'Thêm giường'}
          </Button>
        </Grid>

        <Grid item xs={12} className="counting-open">
          <Collapse in={isAddBedRoom}>
            <Grid item xs={9}>
              <QuantityButtons
                number={single}
                setNumber={setSingle}
                title={'Đơn'}></QuantityButtons>
              <QuantityButtons
                number={double}
                setNumber={setDouble}
                title={'Đôi'}></QuantityButtons>
              <QuantityButtons number={king} setNumber={setKing} title={'King'}></QuantityButtons>
              <QuantityButtons
                number={queen}
                setNumber={setQueen}
                title={'Queen'}></QuantityButtons>
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12} className="add-bedroom-container__counting">
          <p>{totalBeds} giường</p>
          {!isAddBedRoom ? <Grid>{renderBedroomInfo()}</Grid> : ' '}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BedRoom;
