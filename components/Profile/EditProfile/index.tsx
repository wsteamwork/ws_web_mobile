import Lock from '@material-ui/icons/LockOutlined';
import React, { useMemo, useState, FC, Dispatch } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ProfileInfoReq } from '@/types/Requests/Profile/ProfileReq';
import { axios } from '@/utils/axiosInstance';
import {
  TextField,
  Paper,
  Typography,
  Divider,
  Grid,
  FormControl,
  Tooltip,
  Select,
  OutlinedInput,
  FormHelperText,
  Snackbar
} from '@material-ui/core';
import { ReducersList, ReducresActions } from '@/store/Redux/Reducers';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import GridContainer from '@/components/Layout/Grid/Container';
import ButtonGlobal from '@/components/ButtonGlobal';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { getProfile } from '@/store/Redux/Reducers/Profile/profile';
import { useTranslation } from 'react-i18next';

const arrMenuItem = (x: number, y: number) => {
  let i = x;
  let arr = [];
  while (i <= y) {
    if (i < 10) {
      arr.push(<option key={i} value={`0${i}`}>{`0${i}`}</option>);
    } else {
      arr.push(<option key={i} value={`${i}`}>{`${i}`}</option>);
    }
    i++;
  }
  return arr;
};

interface FormikProfileValues {
  gender: number;
  phone: string;
  countryCode: string;
  name: string;
  email: string;
  day: string | null;
  month: string | null;
  year: string | null;
  address: string | null;
  description: string | null;
  job: string | null;
  emergency_contact: string | null;
  avatar_url: string | undefined;
  city_id?: number | null;
  district_id?: number | null;
}

const EditProfile: FC = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispath = useDispatch<Dispatch<ReducresActions>>();

  const handleClose = () => {
    setOpen(false);
  };

  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  const formikInit = useMemo<FormikProfileValues>(() => {
    return {
      name: profile.name ? profile.name : '',
      gender: profile.gender ? profile.gender : 0,
      phone: profile.phone ? profile.phone : '',
      countryCode: '+84',
      email: profile.email ? profile.email : '',
      day: profile.birthday ? moment(profile.birthday).format('DD') : '20',
      month: profile.birthday ? moment(profile.birthday).format('MM') : '08',
      year: profile.birthday ? moment(profile.birthday).format('YYYY') : '1995',
      address: profile.address ? profile.address : '',
      description: profile.description ? profile.description : '',
      job: profile.job ? profile.job : '',
      emergency_contact: profile.emergency_contact ? profile.emergency_contact : '',
      avatar_url: profile.avatar_url ? profile.avatar_url : '',
      city_id: profile.city_id ? profile.city_id : null,
      district_id: profile.district_id ? profile.district_id : null
    };
  }, [profile]);

  const validationForm = Yup.object().shape({
    name: Yup.string()
      .required(t('profile:editProfile:enterFullname'))
      .min(2, t('profile:editProfile:name2Character'))
      .max(50, t('profile:editProfile:name50Character')),
    email: Yup.string().email(t('profile:editProfile:invalidEmail')),
    phone: Yup.string()
      .required(t('profile:editProfile:enterPhone'))
      .test('checkNaN', t('profile:editProfile:notSymbol'), (value) => !isNaN(value))
      .min(10, t('profile:editProfile:phone10Character'))
      .max(11, t('profile:editProfile:phone11Character'))
  });

  const onSubmit = async (
    values: FormikProfileValues,
    actions: FormikHelpers<FormikProfileValues>
  ) => {
    let day = values.day ? values.day : '';
    let month = values.month ? values.month : '';
    let year = values.year ? values.year : '';

    const data: ProfileInfoReq = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      birthday: moment(`${year}` + `${month}` + `${day}`).format('YYYY-MM-DD'),
      address: values.address,
      phone: values.phone,
      description: values.description,
      job: values.job,
      emergency_contact: values.emergency_contact
    };

    try {
      const res: AxiosRes<ProfileInfoRes> = await axios.put('profile?include=city,district', data);
      getProfile(dispath);
      setOpen(true);
    } catch (error) {}

    axios
      .put('profile', data)
      .then((res) => {
        actions.setSubmitting(false);
        //   setOpenSnack(!openSnack);
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
  };

  return (
    <div className={'editProfile'}>
      <Formik
        initialValues={formikInit}
        validationSchema={validationForm}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset
        }: FormikProps<FormikProfileValues>) => {
          return (
            <form onSubmit={handleSubmit}>
              <Paper elevation={0} className={'boxPadding'}>
                <GridContainer xs={12} className={'editRequired'}>
                  <div className={'box_avatar'}>
                    <div className={'avatar'}>
                      <img
                        src="https://media.sketchfab.com/avatars/6c2b684ee5d7466b988d23edd6e4022b/0e2dd482648b49b3bcff0edb9f4da159.png"
                        alt="Avatar"
                        className="imageAvatar"
                      />
                    </div>
                    <div className={'userTitle'}>
                      <Typography variant="h6" color="inherit">
                        {profile ? profile!.name : ''}
                      </Typography>
                      <Typography style={{ color: '#686868' }} variant="body2" color="inherit">
                        {profile ? profile!.email : ''}
                      </Typography>

                      <img
                        src="/static/images/verified.png"
                        alt="Verified"
                        className="verifiedMail"
                      />
                    </div>
                  </div>

                  {/* Đề Nghị Part */}

                  <Typography variant="h5" className={'typoBigTitle'}>
                    {t('profile:editProfile:suggest')}
                  </Typography>
                  <Divider />

                  {/* Tên */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:name')}
                      </Typography>
                    </Grid>

                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={'formControl'}
                        fullWidth
                        required
                        error={!!errors.name}>
                        {/* <InputLabel htmlFor="name">Họ và tên</InputLabel> */}
                        <TextField
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={t('profile:editProfile:yourName')}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Giới tính */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:sex')}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: 'lightTooltip' }}>
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl variant="outlined" className={'formControl'}>
                        {/* <InputLabel htmlFor="Gender">Giới tính</InputLabel> */}
                        <Select
                          native
                          value={values.gender}
                          onChange={handleChange}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          input={
                            <OutlinedInput
                              name="gender"
                              labelWidth={0}
                              id="outlined-gender-native-simple"
                            />
                          }>
                          <option value={0}>{t('profile:editProfile:other')}</option>
                          <option value={1}>{t('profile:editProfile:male')}</option>
                          <option value={2}>{t('profile:editProfile:female')}</option>
                        </Select>
                      </FormControl>
                      <FormHelperText id="gender-helper-text">
                        {t('profile:editProfile:note1')}
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  {/* Số điện thoại */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid item xs={4} sm={3} md={4} lg={3} className={'title'}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:phoneNumber')}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: 'lightTooltip' }}>
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={8}
                      sm={9}
                      md={8}
                      lg={8}
                      className={'containerCountryCode'}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="phone-helper-text"
                        fullWidth
                        required
                        error={!!errors.phone}>
                        <TextField
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={t('profile:editProfile:phoneNumber')}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                        {!!errors.phone ? (
                          touched.phone && <FormHelperText>{errors.phone}</FormHelperText>
                        ) : (
                          <FormHelperText id="phone-helper-text">
                            {t('profile:editProfile:note2')}
                          </FormHelperText>
                        )}
                      </FormControl>
                      {/* </Grid> */}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        Email
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: 'lightTooltip' }}>
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="email-helper-text"
                        fullWidth
                        required
                        error={!!errors.email}>
                        <TextField
                          variant="outlined"
                          id="email-booking"
                          placeholder="Email"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          InputProps={{ readOnly: true }}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                        />

                        {!!errors.email ? (
                          touched.email && (
                            <FormHelperText classes={{ root: 'helperText' }}>
                              {errors.email}
                            </FormHelperText>
                          )
                        ) : (
                          <FormHelperText classes={{ root: 'helperText' }} id="email-helper-text">
                            {t('profile:editProfile:note3')}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:birthday')}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: 'lightTooltip' }}>
                        <Lock color="error" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <Grid item className={'inline'}>
                        <Select
                          native
                          value={values.day ? values.day : '01'}
                          className={'formControl'}
                          onChange={handleChange}
                          placeholder={t('profile:editProfile:birthday')}
                          onBlur={handleBlur}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          input={
                            <OutlinedInput
                              name="day"
                              labelWidth={0}
                              id="outlined-day-native-simple"
                            />
                          }>
                          {arrMenuItem(1, 31)}
                        </Select>

                        {/* </TextField> */}
                      </Grid>
                      <Grid item className={'inline'}>
                        <Select
                          native
                          value={values.month ? values.month : '01'}
                          className={'formControl'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          input={
                            <OutlinedInput
                              name="month"
                              labelWidth={0}
                              id="outlined-month-native-simple"
                            />
                          }>
                          {arrMenuItem(1, 12)}
                        </Select>

                        {/* </TextField> */}
                      </Grid>
                      <Grid item className={'inline'}>
                        <Grid container direction="row" spacing={8} justify="space-between">
                          <Grid item>
                            <Select
                              native
                              value={values.year ? values.year : '01'}
                              className={'formControl'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              inputProps={{
                                className: 'outlineInput'
                              }}
                              input={
                                <OutlinedInput
                                  name="year"
                                  labelWidth={0}
                                  id="outlined-year-native-simple"
                                />
                              }>
                              {arrMenuItem(1900, parseInt(moment().format('YYYY')))}
                            </Select>
                          </Grid>
                        </Grid>
                      </Grid>

                      <FormHelperText classes={{ root: 'helperText' }} id="birthday-helper-text">
                        {t('profile:editProfile:note1')}
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  {/* Địa chỉ */}
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:address')}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="address-helper-text"
                        fullWidth>
                        <TextField
                          name="address"
                          placeholder={t('profile:editProfile:district_city')}
                          value={values.address ? values.address : ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:describe')}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <TextField
                        id="desYourSelf"
                        placeholder={t('profile:editProfile:help')}
                        fullWidth
                        multiline
                        variant="outlined"
                        rows={4}
                        rowsMax="4"
                        onChange={handleChange}
                        name="description"
                        value={values.description ? values.description : ''}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <FormHelperText classes={{ root: 'helperText' }} id="address-helper-text">
                        {t('profile:editProfile:note4')}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </GridContainer>
                <GridContainer xs={12} sm={12} md={12} lg={12} className={'editRequired'}>
                  <Typography variant="h5" className={'typoBigTitle'}>
                    {t('profile:editProfile:option')}
                  </Typography>
                  <Divider />
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:job')}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="Work-helper-text"
                        fullWidth>
                        <TextField
                          name="job"
                          placeholder={t('profile:editProfile:nameCompnay')}
                          value={values.job ? values.job : ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                      {/* </Tooltip> */}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    className={'rowInputs'}>
                    <Grid className={'title'} item xs={4} sm={3} md={4} lg={3}>
                      <Typography variant="button" align="right" className={'typoTitle'}>
                        {t('profile:editProfile:sos')}
                      </Typography>
                      <Tooltip
                        title="Private"
                        placement="top"
                        classes={{ tooltip: 'lightTooltip' }}>
                        <Lock style={{ marginTop: 10 }} color="error" />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={8} sm={9} md={8} lg={8}>
                      <FormControl
                        className={'formControl'}
                        aria-describedby="emergencyContact-helper-text"
                        fullWidth>
                        <TextField
                          name="emergency_contact"
                          value={values.emergency_contact ? values.emergency_contact : ''}
                          inputProps={{
                            className: 'outlineInput'
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                        />
                        <FormHelperText
                          classes={{ root: 'helperText' }}
                          id="emergencyContact-helper-text">
                          {t('profile:editProfile:note5')}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </GridContainer>

                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-end"
                  className={'rowButton'}>
                  <Grid item xs={4} sm={4}>
                    <ButtonGlobal
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      width="100%"
                      disabled={isSubmitting}>
                      {t('profile:editProfile:save')}
                    </ButtonGlobal>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          );
        }}
      </Formik>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <MySnackbarContentWrapper
          variant="success"
          message={t('profile:editProfile:updateSuccess')}
          onClose={handleClose}></MySnackbarContentWrapper>
      </Snackbar>
    </div>
  );
};

export default EditProfile;
