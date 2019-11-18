import ButtonGlobal from '@/components/ButtonGlobal';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LoginRequest } from '@/types/Requests/Account/AccountRequests';
import { AxiosErrorCustom } from '@/types/Requests/ResponseTemplate';
import { FormControl, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
// import ButtonLoginSocial from '../../Signup/ButtonLoginSocial';
import * as Yup from 'yup';
import { loginAccount } from './context';
interface MyFormValues {
  email: string;
  password: string;
}

const FormSignin = () => {
  const [cookies, setCookie] = useCookies(['_token']);

  useEffect(() => {
    if (!!cookies._token) {
      router.back();
    }
  }, [cookies]);

  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('book:bookingForm:enterEmail'))
      .email(t('book:bookingForm:invalidEmail')),
    password: Yup.string()
      .required(t('auth:enterPassword'))
      .min(6, t('auth:min6Characters'))
      .max(50, t('auth:max50Characters'))
  });

  const handleSubmitForm = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    const body: LoginRequest = {
      username: values.email,
      password: values.password
    };

    try {
      const res = await loginAccount(body);
      setCookie('_token', res.access_token, { maxAge: 2147483647, path: '/' });
      actions.setSubmitting(false);
      Router.push('/')
    } catch (error) {
      actions.setSubmitting(false);
      const result: AxiosErrorCustom<{ errors: string[] }> = error;
      setError(result.response.data.data.errors[0]);
    }
  };

  return (
    <Grid className="formSignin">
      <Formik
        enableReinitialize={false}
        validateOnChange={false}
        validationSchema={FormValidationSchema}
        initialValues={{ email: '', password: '' }}
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
                  <Typography variant="h6">{t('auth:loginInfo')}</Typography>
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
                  <FormControl fullWidth error={!!error}>
                    <ButtonGlobal disabled={isSubmitting} width="100%" type="submit">
                      {!isSubmitting ? (
                        t('auth:singin')
                      ) : (
                          <SimpleLoader height="45px" width="100%"></SimpleLoader>
                        )}
                    </ButtonGlobal>
                    <FormHelperText>{!!error && error}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} container justify="center">
                  <FormControl fullWidth>
                    <p className="noAccount">
                      {t('auth:noAccount')}{' '}
                      <Link href="/auth/signup">
                        <a>{t('auth:signup')}</a>
                      </Link>{' '}
                      {t('auth:now')}
                    </p>
                  </FormControl>
                </Grid>

                {/* <ButtonLoginSocial></ButtonLoginSocial> */}
              </Grid>
            </form>
          )}></Formik>
    </Grid>
  );
};

export default FormSignin;
