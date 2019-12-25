import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';
import { InputFeedback } from '@/components/LTR/Merchant/Listing/CreateListing/Location';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { ApartmentBuildingsRes } from '@/types/Requests/LTR/CreateListing/ApartmentBuildings/ApartmentBuildingsRes';
import { RoomWithinBuildingReq } from '@/types/Requests/LTR/CreateListing/StoreRoomWithinBuilding/RoomWithinBuilding';
import { axios_merchant } from '@/utils/axiosInstance';
import { Box, Collapse, FormHelperText, Grid, RadioGroup, TextField, Theme, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as Yup from 'yup';

interface IProps {
  classes?: any
}

interface FormValues {
  apartment_building_id: number;
  room_number: string;
  floor: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      paddingBottom: 8,
      overflowWrap: 'break-word',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: '#767676',
      margin: 0,
    }
  })
);

const CreateOriginalHouse: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { router } = useContext(GlobalContext);
  const [haveBuilding, setHaveBuilding] = useState<number>(0);
  const [buildings, setBuildings] = useState<ApartmentBuildingsRes[]>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();

  const initFormValue: FormValues = {
    apartment_building_id: 0,
    room_number: '',
    floor: ''
  };

  const validationForm = Yup.object().shape({
    apartment_building_id: Yup.string()
      .required('At least one checkbox is required')
      .test('checkNotChoose', 'Please select an option', (value) => value != 0),
    room_number: Yup.string()
      .required('Required'),
    floor: Yup.string()
      .required('Required')
  });

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {

    const data: RoomWithinBuildingReq = {
      apartment_building_id: values.apartment_building_id,
      room_number: values.room_number,
      floor: values.floor
    };

    axios_merchant
      .post('long-term/room-within-building/create', data)
      .then((res) => {
        const idNewRoom = res.data.data.id;
        dispatch({
          type: 'SET_LISTING',
          payload: res.data.data
        });
        router.push(`/host/create-listing/${idNewRoom}/basic`);
      })
      .catch(() => {
        actions.setSubmitting(false);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHaveBuilding(parseInt((event.target as HTMLInputElement).value));
  };

  const createNewRoom = () => {
    router.push(`/host/create-listing/basic`);
  };

  const getBuildings = async () => {
    try {
      const res = await axios_merchant.get(`apartment-buildings`);
      return res.data;
    } catch (error) {
    }
  };

  useEffect(() => {
    getBuildings()
      .then((res) => {
        setBuildings(res.data);
      })
  }, []);

  return (
    <Box p={4}>
      <Box mb={4}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>Hãy bắt đầu từ những điều cơ bản</Typography>
      </Box>
      <GridContainer xl={10}>
        <Box mt={2} mb={4}>
          <Box mb={2}>
            <Typography variant='h5'>
              Căn hộ này có thuộc tòa nhà/ toà căn hộ nào không ?
            </Typography>
          </Box>
          <Grid container className={classes.container} justify='center'>
            <Grid item xs={12}>
              <FormControl component='fieldset' fullWidth>
                <RadioGroup value={String(haveBuilding)} onChange={handleChange} row>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <RadioCustom
                        label='Không, nó không thuộc tòa nhà nào.'
                        descr={
                          <Typography>
                            Ưu tiên lựa chọn này khi bạn có căn hộ/ phòng riêng biệt.
                          </Typography>
                        }
                        value={String(0)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RadioCustom
                        label='Có, nó có thuộc một tòa nhà.'
                        descr={
                          <Typography>
                            Lựa chọn mục này khi nó là căn hộ thuộc toà nhà mà bạn đã tạo trước đó
                          </Typography>
                        }
                        value={String(1)}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Collapse in={!!haveBuilding}>
          <Box>
            <Typography variant='h5' gutterBottom>Thông tin tòa nhà</Typography>
            {buildings && buildings.length > 0 ? (
              <Box mt={2}>
                <Formik
                  initialValues={initFormValue}
                  validationSchema={validationForm}
                  onSubmit={onSubmit}>
                  {({
                    values,
                    handleSubmit,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    setFieldTouched
                  }: FormikProps<FormValues>) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <FormControl
                          error={!!errors.apartment_building_id && touched.apartment_building_id}
                        >
                          <SelectCustom
                            name='apartment_building_id'
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            defaultDisabledOption={'Tòa nhà của bạn'}
                            value={values.apartment_building_id}
                            title='Lựa chọn tòa nhà'
                            options={buildings}
                            onBlurTouched={setFieldTouched}
                          />
                          {touched.apartment_building_id && (
                            <InputFeedback error={errors.apartment_building_id} />
                          )}
                        </FormControl>
                        <Box my={4}>
                          <Typography variant='subtitle1' className={classes.title}>
                            Mã phòng trong tòa nhà?
                          </Typography>
                          <FormControl
                            aria-describedby='room_number-helper-text'
                            required
                            error={!!errors.room_number}>
                            <TextField
                              fullWidth
                              name='room_number'
                              value={values.room_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder='Vd: 101, A202,...'
                              inputProps={{
                                className: 'outlineInput'
                              }}
                              variant='outlined'
                            />
                            {!!errors.room_number ? (
                              touched.room_number && <FormHelperText>{errors.room_number}</FormHelperText>
                            ) : ""}
                          </FormControl>
                        </Box>

                        <Box my={4}>
                          <Typography variant='subtitle1' className={classes.title}>
                            Căn hộ trên tầng mấy?
                          </Typography>
                          <FormControl
                            aria-describedby='floor-helper-text'
                            required
                            error={!!errors.floor}>
                            <TextField
                              fullWidth
                              name='floor'
                              value={values.floor}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder='Vd: 12'
                              inputProps={{
                                className: 'outlineInput'
                              }}
                              variant='outlined'
                            />
                            {!!errors.floor ? (
                              touched.floor && <FormHelperText>{errors.floor}</FormHelperText>
                            ) : ""}
                          </FormControl>
                        </Box>
                        <Box my={1} textAlign='center'>
                          <ButtonGlobal
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                            width='120'
                            disabled={isSubmitting}>
                            Tạo phòng
                          </ButtonGlobal>
                        </Box>
                      </form>
                    );
                  }}
                </Formik>
              </Box>
            ) : (
                <Box mt={2}>
                  <Typography variant='subtitle2'>Bạn chưa có tòa nhà nào, hãy
                  <a href={'/host/create-listing/apartment'}> tạo tòa nhà</a>
                  </Typography>
                </Box>
              )}
          </Box>
        </Collapse>

        <Collapse in={!haveBuilding}>
          <Box my={1} textAlign='center'>
            <ButtonGlobal
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              width='120'
              onClick={createNewRoom}
            >
              Tạo phòng
            </ButtonGlobal>
          </Box>
        </Collapse>
      </GridContainer>
    </Box>
  );
};

export default CreateOriginalHouse;
