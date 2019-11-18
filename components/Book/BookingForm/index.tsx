import React, { FC, forwardRef, useState, useContext } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import {
  Paper,
  Grid,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Collapse,
  Button,
  Dialog,
  Slide,
  DialogContent,
  RadioGroup,
  Radio
} from '@material-ui/core';
import * as Yup from 'yup';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { Remove, Add } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import ButtonGlobal from '@/components/ButtonGlobal';
import Link from 'next/link';
import { BookingCreateReq } from '@/types/Requests/Booking/BookingRequests';
import moment from 'moment';
import { BookingPriceCalculatorRes } from '@/types/Requests/Booking/BookingResponses';
import {
  DEFAULT_DATE_TIME_FORMAT,
  INTERNET_BANKING,
  PENDING,
  WEBSITE_SRC,
  AVAILABLE,
  ONLINE
} from '@/utils/store/global';
import { GlobalContext } from '@/store/Context/GlobalContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { SlideProps } from '@material-ui/core/Slide';
import CheckSuccess from '@/components/Loading/CheckSuccess';
import { useTranslation } from 'react-i18next';
import { createBooking } from '@/store/Redux/Reducers/Book/book';
import TooltipPayment from './TooltipPayment';

type PaymentMethod = 'payment1' | 'payment2';

export const TransitionCustom = forwardRef<HTMLElement, SlideProps>((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

const CheckBoxCustom = forwardRef<HTMLElement, CheckboxProps>((props, ref) => (
  <Checkbox {...props} inputRef={ref} />
));

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: number;
  guestName: string;
  isSomeOneElse: boolean;
  additionalNote: string;
  additionalServices: Array<number>;
  isWork: boolean;
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
      .min(5, t('book:bookingForm:min5character'))
      .max(500, t('book:bookingForm:max500character')),
    paymentMethod: Yup.string().oneOf(['payment1', 'payment2']),
    // country: Yup.number()
    //   .required('Vui lòng chọn thành phố')
    //   .min(1, 'Vui lòng chọn thành phố'),
    isSomeOneElse: Yup.boolean(),
    guestName: Yup.string().when('isSomeOneElse', (status: boolean, schema: Yup.StringSchema) => {
      return status
        ? schema
          .required(t('book:bookingForm:enterName'))
          .min(2, t('book:bookingForm:min2character'))
          .max(50, t('book:bookingForm:max50character'))
        : schema;
    })
  });

  return FormValidationSchema;
};

const BookingForm: FC = () => {
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.book.room);
  const dataCalculate = useSelector<ReducersList, BookingPriceCalculatorRes>(
    (state) => state.book.dataCalculate
  );
  const { router, width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const FormValidationSchema = useValidata();

  const [isRequest, setIsRequest] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleRequest = () => {
    setIsRequest(!isRequest);
  };

  const handleSubmitForm = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    const data: BookingCreateReq = {
      name: `${values.lastName} ${values.firstName}`,
      email: values.email,
      name_received: values.guestName,
      room_id: dataCalculate.room_id,
      coupon: '',
      checkin: moment.unix(dataCalculate.checkin).format(DEFAULT_DATE_TIME_FORMAT),
      checkout: moment.unix(dataCalculate.checkout).format(DEFAULT_DATE_TIME_FORMAT),
      booking_type: dataCalculate.booking_type,
      phone: values.phone.replace(/\s/g, ''),
      number_of_guests: dataCalculate.number_of_guests,
      note: values.additionalNote ? values.additionalNote : null,
      payment_method: INTERNET_BANKING,
      payment_status: PENDING,
      source: WEBSITE_SRC,
      status: AVAILABLE,
      type: ONLINE,
      booking_purpose: values.isWork ? 1 : 0
    };

    try {
      const res = await createBooking(data);

      if (room.instant_book === 0) {
        setOpenDialog(true);
      } else {
        if (values.paymentMethod === 'payment1') {
          router.push(`/payment/direct/${res.uuid}`);
        } else {
          router.push(`/payment/invoice/${res.uuid}`);
        }
      }

      actions.setSubmitting(false);
    } catch (error) {
      router.push(`/room/${data.room_id}`);
      actions.setSubmitting(false);
    }
  };

  return (
    <Paper square className={'paperCustomOuter'}>
      <Paper square className={'paperCustom'}>
        <Formik
          // enableReinitialize={false}
          validateOnChange={false}
          validationSchema={FormValidationSchema}
          initialValues={{
            paymentMethod: 'payment1',
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{t('book:bookingForm:infoBooking')}</Typography>
                    <Typography variant="body2" style={{ color: '#b9b8b8' }}>
                      {t('book:bookingForm:rulesName')}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <FormControl error={!!touched.firstName && !!errors.firstName} fullWidth>
                      <TextField
                        variant="outlined"
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
                      <TextField
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
                      <TextField
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
                      <TextField
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

                  <Grid item xs={6}>
                    <FormControl>
                      <FormControlLabel
                        control={
                          <CheckBoxCustom
                            id="on-work"
                            name="isWork"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isWork}
                            value="1"
                            color="primary"
                          />
                        }
                        label={t('book:bookingForm:toWork')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl>
                      <FormControlLabel
                        control={
                          <CheckBoxCustom
                            id="booking-for-someone"
                            name="isSomeOneElse"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.isSomeOneElse}
                            value="1"
                            color="primary"
                          />
                        }
                        label={t('book:bookingForm:bookOther')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Collapse in={values.isSomeOneElse}>
                      <Paper className="paperCustom grayPaper" elevation={0} square>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6">{t('book:bookingForm:infoRecevier')}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl error={!!(errors.guestName && touched.guestName)} fullWidth>
                              <TextField
                                variant="outlined"
                                id="guest-name"
                                name="guestName"
                                //   inputRef={guestNameRef}
                                onChange={handleChange}
                                label={t('book:bookingForm:fullName')}
                                placeholder={t('book:bookingForm:placeFullName')}
                                onBlur={handleBlur}
                                value={values.guestName}
                              />
                              <FormHelperText>
                                {touched.guestName ? errors.guestName : ''}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Collapse>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      name="addition-services"
                      color="primary"
                      style={{ paddingLeft: 0 }}
                      onClick={toggleRequest}>
                      {isRequest ? <Remove /> : <Add />}
                      {t('book:bookingForm:specialRequirements')}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Collapse in={isRequest}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <TextField
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
                    </Collapse>
                  </Grid>

                  {room.instant_book === 1 && (
                    <Grid item xs={12}>
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
                                control={<Radio color="primary" />}
                                label={
                                  <p>
                                    {t('book:bookingForm:directTransfer')}{' '}
                                    <TooltipPayment></TooltipPayment>
                                  </p>
                                }
                              />
                              <FormControlLabel
                                value="payment2"
                                control={<Radio color="primary" />}
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
                  )}

                  <Grid item xs={12}>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <ButtonGlobal
                          variant="contained"
                          name="confirm-information"
                          size="large"
                          color="primary"
                          disabled={isSubmitting}
                          type="submit">
                          {room && !isSubmitting ? (
                            t('book:bookingForm:confirmInfo')
                          ) : (
                              <SimpleLoader height="45px" width="100%"></SimpleLoader>
                            )}
                        </ButtonGlobal>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="flex-end">
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

      {room && (
        <Dialog
          TransitionComponent={TransitionCustom}
          keepMounted
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          scroll="body"
          fullScreen={width === 'xs'}
          maxWidth="sm"
          open={openDialog}
          onClose={() => setOpenDialog(false)}>
          <DialogContent classes={{ root: 'dialogContent' }}>
            <div style={{ textAlign: 'center' }}>
              <CheckSuccess
                width={250}
                height={250}
                message={
                  room!.instant_book === 0
                    ? t('book:bookingForm:noInstantBook')
                    : t('book:bookingForm:instantBook')
                }
              />
              {room!.instant_book === 0 && (
                <ButtonGlobal
                  variant="contained"
                  name="confirm_information"
                  color="primary"
                  type="submit"
                  onClick={() => router.push(`/`)}>
                  {t('book:bookingForm:submit')}
                </ButtonGlobal>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
};

export default BookingForm;
