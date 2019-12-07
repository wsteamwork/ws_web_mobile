import ButtonGlobal from '@/components/ButtonGlobal';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import MySnackbarContentWrapper from '@/components/Profile/EditProfile/MySnackbarContentWrapper';
import { ForgetPasswordReq } from '@/types/Requests/Account/AccountRequests';
import { FormControl, FormHelperText, Grid, Snackbar, TextField, Typography } from '@material-ui/core';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { sendForgetPassword } from './context';
interface MyFormValues {
  email: string;
}

const FormForgetPassword = () => {
  const [open, setOpen] = useState(false);
  const [forgetMessage, setForgetMessage] = useState('');
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');
  const handleClose = () => {
    setOpen(false);
  };
  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('book:bookingForm:enterEmail'))
      .email(t('book:bookingForm:invalidEmail'))
  });

  const handleSubmitForm = async (values: MyFormValues, actions: FormikHelpers<MyFormValues>) => {
    const body: ForgetPasswordReq = {
      email: values.email
    };
    try {
      const res = await sendForgetPassword(body);
      if (res) {
        setForgetMessage(res.data.message);
        setOpen(true);
      }
    } catch (error) {
      actions.setSubmitting(false);
      setError(error.response.data.data.error);
    }
  };

  return (
    <Grid item xs={12} md={7} className="formSignin" style={{ background: 'white', padding: 16, borderRadius: '0 8px 8px 0' }}>
      <Formik
        enableReinitialize={false}
        validateOnChange={false}
        validationSchema={FormValidationSchema}
        initialValues={{ email: '' }}
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
                  <Typography variant="h6">{t('auth:forgetPasswordInfo')}</Typography>
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
                  <FormControl fullWidth error={!!error}>
                    <ButtonGlobal disabled={isSubmitting} width="100%" type="submit">
                      {!isSubmitting ? (
                        t('auth:sendForgetPassword')
                      ) : (
                          <SimpleLoader height="45px" width="100%"></SimpleLoader>
                        )}
                    </ButtonGlobal>
                    <FormHelperText>{!!error && error}</FormHelperText>
                  </FormControl>
                </Grid>

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
                    message={forgetMessage}
                    onClose={handleClose}></MySnackbarContentWrapper>
                </Snackbar>
              </Grid>
            </form>
          )}></Formik>

    </Grid>
  );
};

export default FormForgetPassword;
