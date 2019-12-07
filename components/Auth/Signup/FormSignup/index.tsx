import ButtonGlobal from '@/components/ButtonGlobal';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RegisterReq } from '@/types/Requests/Account/AccountRequests';
import { AxiosErrorCustom } from '@/types/Requests/ResponseTemplate';
import { FormControl, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { registerAccount } from './context';
// import ButtonLoginSocial from '../ButtonLoginSocial';

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  // birthday: string;
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
    password: Yup.string()
      .required(t('auth:enterPassword'))
      .min(6, t('auth:min6Characters'))
      .max(50, t('auth:max50Characters')),
    password_confirmation: Yup.string()
      .required(t('auth:confPass'))
      .min(6, t('auth:min6Characters'))
      .max(50, t('auth:max50Characters'))
      .oneOf([Yup.ref('password')], t('auth:passNotMatch')),
    // birthday: Yup.date().required(t('auth:enterBirthday'))
  });

  return FormValidationSchema;
};

const FormSignup: FC = () => {
  const [cookies, setCookie] = useCookies(['_token']);
  const [error, setError] = useState('');
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const FormValidationSchema = useValidata();

  useEffect(() => {
    if (!!cookies._token) {
      router.back();
    }
  }, [cookies]);

  const handleSubmitForm = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    const body: RegisterReq = {
      name: `${values.firstName} ${values.lastName}`,
      gender: 1,
      phone: values.phone,
      email: values.email,
      // birthday: values.birthday,
      password: values.password,
      password_confirmation: values.password_confirmation
    };

    try {
      const res = await registerAccount(body);
      setCookie('_token', res.access_token, { maxAge: 2147483647, path: '/' });
      actions.setSubmitting(false);
      location.reload();
    } catch (error) {
      actions.setSubmitting(false);
      const result: AxiosErrorCustom<{ errors: { email: string[] }; exception: string }> = error;
      if (!!result.response.data.data.errors.email) {
        setError(result.response.data.data.errors.email[0]);
      }
    }
  };

  const formikInit: MyFormValues = useMemo<MyFormValues>(() => {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      // birthday: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }, []);

  return (
    <Grid item xs={12} md={7} className="formSignin" style={{ background: 'white', padding: 16, borderRadius: '0 8px 8px 0' }}>
      <Formik
        enableReinitialize={false}
        validateOnChange={false}
        validationSchema={FormValidationSchema}
        initialValues={formikInit}
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
                  <Typography variant="h6">{t('auth:registerInfo')}</Typography>
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

                <Grid item xs={12}>
                  <FormControl error={!!(errors.email && touched.email)} fullWidth>
                    <TextField
                      variant="outlined"
                      id="email-booking"
                      type="email"
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

                {/* <Grid item xs={12}>
                  <FormControl error={!!(errors.birthday && touched.birthday)} fullWidth>
                    <TextField
                      variant="outlined"
                      type="date"
                      name="birthday"
                      label={t('auth:birthday')}
                      placeholder={t('auth:birthday')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        values.birthday ||
                        moment()
                          .subtract(15, 'years')
                          .format('yyyy-DD-mm')
                      }
                    />
                    <FormHelperText>{touched.birthday ? errors.birthday : ''}</FormHelperText>
                  </FormControl>
                </Grid> */}

                <Grid item xs={12}>
                  <FormControl error={!!(errors.password && touched.password)} fullWidth>
                    <TextField
                      variant="outlined"
                      // id="email-booking"
                      type="password"
                      name="password"
                      label={t('auth:password')}
                      placeholder={t('auth:password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <FormHelperText>{touched.password ? errors.password : ''}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    error={!!(errors.password_confirmation && touched.password_confirmation)}
                    fullWidth>
                    <TextField
                      variant="outlined"
                      // id="email-booking"
                      type="password"
                      name="password_confirmation"
                      label={t('auth:enterConf')}
                      placeholder={t('auth:enterConf')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                    />
                    <FormHelperText>
                      {touched.password_confirmation ? errors.password_confirmation : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth error={!!error}>
                    <ButtonGlobal disabled={isSubmitting} width="100%" type="submit">
                      {!isSubmitting ? (
                        t('auth:signup')
                      ) : (
                          <SimpleLoader height="45px" width="100%"></SimpleLoader>
                        )}
                    </ButtonGlobal>
                    <FormHelperText>{!!error && error}</FormHelperText>
                  </FormControl>
                </Grid>

                {/* <ButtonLoginSocial></ButtonLoginSocial> */}
              </Grid>
            </form>
          )}></Formik>
    </Grid>
  );
};

export default FormSignup;
