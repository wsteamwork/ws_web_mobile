import ButtonGlobal from '@/components/ButtonGlobal';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { createLTBooking, LTBookingReducerState } from '@/store/Redux/Reducers/LTR/LTBooking/ltbooking';
import mainColor from '@/styles/constants/colors';
import { LTBookingCreateReq } from '@/types/Requests/Booking/BookingRequests';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { WEBSITE_SRC } from '@/utils/store/global';
import { FormControl, FormControlLabel, FormHelperText, Grid, Paper, Radio, RadioGroup, Slide, TextField, Typography } from '@material-ui/core';
import { SlideProps } from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/styles';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import Link from 'next/link';
import React, { FC, forwardRef, Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TooltipPayment from './TooltipPayment';

export type PaymentMethod = 'payment1' | 'payment2';

export const TransitionCustom = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // country: number;
  // guestName: string;
  // isSomeOneElse: boolean;
  additionalNote: string;
  // additionalServices: Array<number>;
  // isWork: boolean;
  paymentMethod: PaymentMethod;
}

const useValidata = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('book:bookingForm:enterFirstName'))
      .min(2, t('book:bookingForm:min2character'))
      .max(50, t('book:bookingForm:max50character')),
    lastName: Yup.string()
      .required(t('book:bookingForm:enterLastName'))
      .min(2, t('book:bookingForm:min2character'))
      .max(50, t('book:bookingForm:max50character')),
    email: Yup.string()
      .required(t('book:bookingForm:enterEmail'))
      .email(t('book:bookingForm:invalidEmail')),
    phone: Yup.string()
      .required(t('book:bookingForm:enterPhone'))
      .min(10, t('book:bookingForm:beetwen10_11'))
      .max(11, t('book:bookingForm:beetwen10_11'))
      .test('checkNaN', t('book:bookingForm:notSymbol'), (value) => !isNaN(value)),
    additionalNote: Yup.string()
      .max(500, t('book:bookingForm:max500character')),
    paymentMethod: Yup.string().oneOf(['payment1', 'payment2'])
  });

  return FormValidationSchema;
};

const LTTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: mainColor.primaryLT,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#975cff',
    },
    '& label.MuiFormLabel-root': {
      color: mainColor.primaryLT,
      fontSize: 16
    },
    '& .MuiOutlinedInput-root': {
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: mainColor.primaryLT,
      },
      '&.Mui-focused fieldset': {
        borderColor: mainColor.primaryLT,
      },
    },
  },
})(TextField);

const BookingForm: FC = () => {
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);
  const { movein, moveout, numberOfGuests } = useSelector<ReducersList, LTBookingReducerState>(
    (state) => state.ltBooking
  );
  const [openDialog, setOpenDialog] = useState(false);
  // const [isRequest, setIsRequest] = useState(false);
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();

  const FormValidationSchema = useValidata();

  const handleSubmitForm = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    const data: LTBookingCreateReq = {
      name: `${values.lastName} ${values.firstName}`,
      email: values.email,
      long_term_room_id: ltroom.id,
      // coupon: '',
      move_in: movein,
      move_out: moveout,
      // booking_type: dataCalculate.booking_type,
      phone: values.phone.replace(/\s/g, ''),
      guests: { total_guests: numberOfGuests },
      note: values.additionalNote,
      // payment_method: INTERNET_BANKING,
      // payment_status: PENDING,
      source: WEBSITE_SRC
      // status: AVAILABLE,
      // type: ONLINE
      // booking_purpose: values.isWork ? 1 : 0
    };

    try {
      const res = await createLTBooking(data);

      if (ltroom && ltroom.instant_book === 0) {
        setOpenDialog(true);
      } else if (res) {
        let query = {
          uuid: res.contracts.data[0].uuid
        };
        if (values.paymentMethod === 'payment1') {
          router.push({
            pathname: '/long-term-booking/payment/direct',
            query
          });
        } else {
          router.push({
            pathname: '/long-term-booking/payment/invoice',
            query
          });
        }
      }

      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
    }
  };

  let fullName = profile ? profile.name : '';
  let fName = fullName.split(' ').slice(1).join(' ');
  let lName = fullName.split(' ').slice(0, 1).join(' ');

  return (
    <Fragment>
      <Paper elevation={0}>
        <Formik
          // enableReinitialize={false}
          validateOnChange={false}
          validationSchema={FormValidationSchema}
          initialValues={{
            paymentMethod: 'payment1',
            firstName: fName,
            lastName: lName,
            phone: profile ? profile.phone : '',
            email: profile ? profile.email : '',
            additionalNote: ''
          }}
          onSubmit={handleSubmitForm}
          render={({
            values,
            handleSubmit,
            touched,
            errors,
            handleChange,
            handleBlur,
            isSubmitting
          }: FormikProps<MyFormValues>) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{t('book:bookingForm:infoBooking')}</Typography>
                    <Typography variant="body2" style={{ color: '#b9b8b8' }}>
                      {t('book:bookingForm:rulesName')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <FormControl error={!!touched.firstName && !!errors.firstName} fullWidth>
                      <LTTextField
                        margin="normal"
                        variant="outlined"
                        autoFocus
                        id="firstName"
                        name="firstName"
                        label={t('book:bookingForm:firstName')}
                        placeholder={t('book:bookingForm:placeFirstName')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      <FormHelperText>{touched.firstName ? errors.firstName : ''}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <FormControl error={!!(touched!.lastName && errors.lastName)} fullWidth>
                      <LTTextField
                        margin="normal"
                        variant="outlined"
                        id="lastName"
                        name="lastName"
                        label={t('book:bookingForm:lastName')}
                        placeholder={t('book:bookingForm:placeLastName')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                      <FormHelperText>{touched.lastName ? errors.lastName : ''}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl error={!!(errors.email && touched.email)} fullWidth>
                      <LTTextField
                        margin="normal"
                        variant="outlined"
                        id="email-booking"
                        name="email"
                        label="Email"
                        placeholder={t('book:bookingForm:placeEmail')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <FormHelperText>{touched.email ? errors.email : ''}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl error={!!(errors.phone && touched!.phone)} fullWidth>
                      <LTTextField
                        margin="normal"
                        variant="outlined"
                        id="phone-number"
                        name="phone"
                        label={t('book:bookingForm:phoneNumber')}
                        placeholder={t('book:bookingForm:placePhone')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                      <FormHelperText>{touched.phone ? errors.phone : ''}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    {/* <Collapse in={isRequest}> */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <LTTextField
                            margin="normal"
                            variant="outlined"
                            id="additional-note"
                            name="additionalNote"
                            multiline
                            rows={5}
                            label={t('book:bookingForm:otherRequirements')}
                            placeholder={t('book:bookingForm:placeRequirements')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.additionalNote}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    {/* </Collapse> */}
                  </Grid>


                  <Grid item xs={12} className="formBooking">
                    <Grid container>
                      <Grid item>
                        <FormControl
                          error={!!(errors.paymentMethod && touched.paymentMethod)}
                          component="fieldset">
                          <Typography variant="h6">
                            {t('book:bookingForm:choosePayment')}
                          </Typography>
                          <RadioGroup
                            name="paymentMethod"
                            onBlur={handleBlur}
                            value={values.paymentMethod}
                            onChange={handleChange}>
                            <FormControlLabel
                              value="payment1"
                              control={<Radio style={{ color: '#673ab7' }} />}
                              label={
                                <p>
                                  {t('book:bookingForm:directTransfer')}{' '}
                                  <TooltipPayment />
                                </p>
                              }
                            />
                            <FormControlLabel
                              value="payment2"
                              control={<Radio style={{ color: '#673ab7' }} />}
                              label={
                                <p>
                                  {t('book:bookingForm:transferMoney')}{' '}
                                  <a href="https://www.baokim.vn/" target="_blank">
                                    Bảo Kim
                                    </a>
                                </p>
                              }
                            />
                          </RadioGroup>
                          <FormHelperText>
                            {touched.paymentMethod ? errors.paymentMethod : ''}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="center">
                      <Grid item>
                        <ButtonGlobal
                          background="linear-gradient(to right, #667eea, #764ba2)"
                          variant="contained"
                          name="confirm-information"
                          size="large"
                          color="primary"
                          disabled={isSubmitting}
                          type="submit">
                          {ltroom && !isSubmitting ? (
                            t('book:bookingForm:confirmInfo')
                          ) : (
                              <SimpleLoader height="28px" width="100%" />
                            )}
                        </ButtonGlobal>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="center">
                      <Grid item>
                        <Typography variant="subtitle2" style={{ color: '#b3b3b3' }}>
                          {t('book:bookingForm:notPayment')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
        />
      </Paper>

      <Grid item xs={12}>
        <Grid container justify="flex-start">
          <Grid item>
            <Typography variant="body2" style={{ padding: '15px' }}>
              {t('book:bookingForm:desFooter')}{' '}
              <Link href="/terms-and-conditions">
                <a>{t('book:bookingForm:termsCondition')} </a>
              </Link>
              {t('book:bookingForm:privatePolicy')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BookingForm;
