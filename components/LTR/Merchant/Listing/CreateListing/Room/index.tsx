import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { countBedsNumberFromBedRoomList, CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { BedRoomReq } from '@/types/Requests/LTR/Basic/BasicRequests';
import { Theme } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined'; import { withStyles } from '@material-ui/styles';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { Dispatch, FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { scroller } from 'react-scroll';
import * as Yup from 'yup';
import { InputFeedback } from '../Location';
import AddBedRoom from './AddBedRoom';

interface IProps { }

interface FormValues {
  bedsNumber: number;
  bedRoomsNumber: number;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dce0e0',
  }
}))(Tooltip);

const Room: FC<IProps> = (props) => {
  const {
    guestRecommendation,
    maxGuest,
    bedRoomsNumber,
    bedRooms,
    disableSubmit,
    bedsNumber: bedsNumberRedux,
    listing
  } = useSelector<ReducersList, CreateListingState>((state) => state.createListing);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();

  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const [guest, setGuest] = useState<number>(guestRecommendation);
  const [maxGuests, setMaxGuests] = useState<number>(maxGuest);
  const [showErrorsBedsNumber, setErrorsBedsNumber] = useState<boolean>(false);
  const [bedRoomsList, setBedRoomsList] = useState<BedRoomReq>(bedRooms);
  const [bedsNumber, setBedsNumber] = useState<number>(bedsNumberRedux);
  const [totalBedsNumber, setTotalBedsNumber] = useState<number>(0);
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);

  const scrollToError = () => {
    scroller.scrollTo('errors-beds-number', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  useEffect(() => {
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: disableSubmitForm
    });
  }, [disableSubmitForm]);

  useEffect(() => {
    if (!bedRoomsNumber) {
      let bedRoomsTemp: any = {};
      for (let i = 1; i <= bedRoomsNumber; i++) {
        bedRoomsTemp[`bedroom_${i}`] = {
          number_bed: 0,
          beds: [],
          area: 0
        };
      }
      bedRoomsTemp['number_bedroom'] = bedRoomsNumber;
      setBedRoomsList(bedRoomsTemp);
    }
  }, [bedRooms]);

  useEffect(() => {
    // console.log(guestRecommendation, maxGuest);
    if (bedRooms == null) {
      let bedRoomsTemp: any = {};
      for (let i = 1; i <= bedRoomsNumber; i++) {
        bedRoomsTemp[`bedroom_${i}`] = {
          number_bed: 0,
          beds: [],
          area: 0
        };
      }
      bedRoomsTemp['number_bedroom'] = bedRoomsNumber;
      setBedRoomsList(bedRoomsTemp);
    }
  }, []);

  useEffect(() => {
    setDisableSubmit(!(bedsNumber == totalBedsNumber));
    if (!(bedsNumber == totalBedsNumber)) scrollToError();
  }, [bedsNumber, totalBedsNumber]);


  useEffect(() => {
    if (bedRoomsList) {
      setTotalBedsNumber(countBedsNumberFromBedRoomList(bedRoomsList));
    }
  }, [bedRoomsList]);

  useEffect(() => {
    dispatch({
      type: 'SET_GUEST_RECOMMENDATION',
      payload: guest
    });
  }, [guest]);

  useEffect(() => {
    dispatch({
      type: 'SET_MAX_GUEST',
      payload: maxGuests
    });
  }, [maxGuests]);

  useEffect(() => {
    dispatch({
      type: 'SET_BEDS_NUMBER',
      payload: bedsNumber
    });
  }, [bedsNumber]);

  const bedRoomsNumberArray = (length: number) =>
    Array.from(new Array(length), (val: any, index: number) => ++index);

  const callBackOnChange = (value: any) => {
    dispatch({
      type: 'SET_BEDROOMS_NUMBER',
      payload: value
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

  const initFormValue: FormValues = {
    bedsNumber: 1,
    bedRoomsNumber: bedRoomsNumber
  };

  const validationForm = Yup.object().shape({
    accommodation_type: Yup.string()
      .required('At least one checkbox is required')
      .test('checkNotChoose', 'Please select an option', (value) => value != 0)
  });
  const handleFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  };

  return (
    <div className="step1-tab2-room">
      <Grid className="createListing-title">
        <Grid className="createListing-heading-1">
          {t('host:numberOfGuest')}
        </Grid>
      </Grid>

      <Formik
        initialValues={initFormValue}
        validationSchema={validationForm}
        onSubmit={handleFormSubmit}
        render={({
          values,
          handleSubmit,
          initialValues,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldTouched,
          setFieldValue
        }: FormikProps<FormValues>) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid item sm={8}>
                <QuantityButtons
                  number={guest}
                  setNumber={setGuest}
                  title={t('host:guest')}
                  tooltip={<HtmlTooltip
                    classes={{ tooltip: 'tooltip' }}
                    title={t('host:tooltipGuest')}
                    placement='top'>
                    <LiveHelpOutlinedIcon style={{ marginLeft: 8 }} fontSize="small" />
                  </HtmlTooltip>}>
                </QuantityButtons>
                <QuantityButtons
                  number={maxGuests}
                  setNumber={setMaxGuests}
                  title={t('host:maxAdditionalGuest')}
                  tooltip={<HtmlTooltip
                    classes={{ tooltip: 'tooltip' }}
                    title={t('host:tooltipMaxGuest')}
                    placement='top'>
                    <LiveHelpOutlinedIcon style={{ marginLeft: 8 }} fontSize="small" />
                  </HtmlTooltip>}></QuantityButtons>
              </Grid>

              <Grid className="errors-beds-number" style={{ paddingRight: 10 }}>
                <SelectCustom
                  name="bedRoomsNumber"
                  onChange={(e) => {
                    handleChange(e);
                    callBackOnChange(parseInt(e.target.value));
                  }}
                  value={values.bedRoomsNumber}
                  // callBackOnChange={callBackOnChange}
                  unit={t('host:bedroom')}
                  title={t('host:bedroomSubtitle')}
                  options={bedRoomsNumberArray(50)}
                  twoThirdWidth={true}
                  onBlurTouched={setFieldTouched}
                />
                {touched.bedRoomsNumber && <InputFeedback error={errors.bedRoomsNumber} />}
              </Grid>

              <Grid style={{ marginTop: 32 }} item sm={8}>
                <h3 className="create-listing-title">{t('host:bedInBedroom')}</h3>
                <QuantityButtons
                  number={bedsNumber}
                  setNumber={setBedsNumber}
                  minimumValue={1}
                  title={t('host:numberBedTotal')}></QuantityButtons>
              </Grid>
              <Grid style={{ marginBottom: 32 }}>
                {showErrorsBedsNumber && !(bedsNumber == totalBedsNumber) && (
                  <InputFeedback
                    error={t('host:numberBedTotalSubtitle')}
                  />
                )}
              </Grid>

              <Grid className="createListing-heading-2">{t('host:aboutBedrooms')}</Grid>
              <h3 className="createListing-subTitle">
                {t('host:aboutBedroomSubtitle1')}
                <br></br>
                {t('host:aboutBedroomSubtitle2')}
              </h3>
              {bedRoomsNumberArray(bedRoomsNumber).map((number) => (
                <AddBedRoom
                  key={number}
                  setErrorsBedsNumber={setErrorsBedsNumber}
                  roomNumber={number}
                  bedRoomsList={bedRoomsList}
                  setBedroomsList={setBedRoomsList}
                />
              ))}
            </form>
          );
        }}
      />
    </div>
  );
};

export default Room;
