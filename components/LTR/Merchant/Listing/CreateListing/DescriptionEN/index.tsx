import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { DescriptionReducerAction, getDetailDescriptionEN } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/description';
import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import createStyles from '@material-ui/core/styles/createStyles';
import { Formik, FormikProps } from 'formik';
import React, { FC, Fragment, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import CardTextarea from './CardTextarea';
interface IProps {
  classes?: any;
}

interface MyDescription {
  name_en: string;
  description_en: string;
  space_en: string;
  rules_en: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name_en: Yup.string()
      .required(t('details:requiredName'))
      .min(10, t('details:name10Character'))
      .max(100, t('details:name100Character')),
    description_en: Yup.string()
      .required(t('details:requiredDes'))
      .min(50, t('details:des50Character'))
      .max(5000, t('details:des5000Character')),
    space_en: Yup.string().max(5000, t('details:space5000Character')),
    rules_en: Yup.string().max(5000, t('details:rules5000Character'))
  });

  return FormValidationSchema;
};

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    normal_divider: {
      margin: theme.spacing(3, 0)
    },
    margin_top: {
      marginTop: '32px !important'
    },
    notchedOutline: {
      border: 'none',
      '&:focus': {
        border: 'none'
      }
    }
  })
);

const DescriptionEN: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { width, router } = useContext(GlobalContext);
  const FormValidationSchema = useValidatation();

  const name_en = useSelector<ReducersList, string>((state) => state.description.name_en);
  const description_en = useSelector<ReducersList, string>((state) => state.description.description_en);
  const space_en = useSelector<ReducersList, string>((state) => state.description.space_en);
  const rules_en = useSelector<ReducersList, string>((state) => state.description.rules_en);
  const dispatch_des = useDispatch<Dispatch<DescriptionReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  const id = router.query.id;
  useEffect(() => {
    getDetailDescriptionEN(id, dispatch_des);
  }, [id]);

  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab1-en' });
  }, []);
  useMemo(() => {
    dispatch_detail({ type: 'setDisableNext', payload: (name_en.length < 10) });
  }, [name_en]);

  const handleSubmitForm: any = () => {
    return {};
  };

  const formikInit: MyDescription = useMemo<MyDescription>(() => {
    return {
      name_en: name_en,
      description_en: description_en,
      space_en: space_en,
      rules_en: rules_en
    };
  }, [name_en, description_en, space_en, rules_en]);

  const dispatchDescription = (typeAction, value) => {
    dispatch_des({ type: typeAction.type, payload: value });
  };
  return (
    <Fragment>
      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={FormValidationSchema}
        initialValues={formikInit}
        onSubmit={handleSubmitForm}
        render={({
          values,
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur
        }: FormikProps<MyDescription>) => (
            <form onSubmit={handleSubmit}>
              <Grid container justify="center" alignContent="center">
                <Grid item xs={11}>
                  <CardTextarea
                    name="name_en"
                    label={t('details:listingNameEN')}
                    sub_label={t('details:subName')}
                    value={values.name_en.replace(/\s+/g, ' ')}
                    classTextField={
                      !!(values.name_en.length < 10 && touched!.name_en)
                        ? 'textarea error_textarea'
                        : 'textarea'
                    }
                    show_error={!!(values.name_en.length < 10 && touched!.name_en)}
                    error_message={errors.name_en ? errors.name_en : t('details:defaultError')}
                    rows={1}
                    rowsMax={1}
                    max_char={100}
                    multiline={true}
                    classMaxChar={
                      !!(values.name_en.length < 10 && touched!.name_en)
                        ? 'error_char'
                        : 'remain_char'
                    }
                    InputProps={{
                      classes: {
                        notchedOutline: !!(values.name_en.length < 10 && touched!.name_en)
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    autoFocus={true}
                    inputProps={{ maxLength: 100 }}
                    handleChange={(e) => {
                      handleChange(e)
                      dispatchDescription({ type: 'setNameEN' }, e.currentTarget.value);
                    }}
                    handleBlur={(e) => {
                      handleBlur(e);
                      dispatchDescription({ type: 'setNameEN' }, e.currentTarget.value);
                    }}
                  />
                  <Divider className={classes.normal_divider} />

                  <CardTextarea
                    name="description_en"
                    label={t('details:listingDesEN')}
                    sub_label={t('details:subDes')}
                    // value={values.description_en.replace(/\s+/g, ' ')}
                    value={values.description_en}
                    classTextField={
                      !!(values.description_en.length < 50 && touched!.description_en)
                        ? 'textarea error_textarea'
                        : 'textarea'
                    }
                    show_error={
                      !!(values.description_en.length < 50 && touched!.description_en)
                    }
                    error_message={
                      values.description_en.length < 50 ? errors.description_en : t('details:defaultError')
                    }
                    title_tooltips={
                      <Fragment>
                        <Typography color="inherit">{t('details:examples')}</Typography>
                        <Typography color="inherit">{t('details:desExample1')}</Typography>
                        <Typography color="inherit">{t('details:desExample2')}</Typography>
                      </Fragment>
                    }
                    rows={4}
                    rowsMax={9}
                    max_char={5000}
                    multiline={true}
                    classMaxChar={
                      !!(values.description_en.length < 50 && touched!.description_en)
                        ? 'error_char'
                        : 'remain_char'
                    }
                    InputProps={{
                      classes: {
                        notchedOutline: !!(
                          values.description_en.length < 50 &&
                          touched!.description_en &&
                          errors.description_en
                        )
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    inputProps={{ maxLength: 5000 }}
                    placeholder={width !== 'xl' && width !== 'lg' ? t('details:desExample1') : ''}
                    handleChange={handleChange}
                    handleBlur={(e) => {
                      handleBlur(e);
                      // if (e.currentTarget.value.length > 30) {
                      dispatchDescription({ type: 'setDescriptionEN' }, e.currentTarget.value);
                      // }
                    }}
                  />

                  <Divider className={classes.normal_divider} />
                  <section>
                    <Typography variant="h1" gutterBottom className="label main_label">
                      {t('details:addMoreInfo')}
                    </Typography>
                    <Grid item className="normal_text">
                      <span>{t('details:subAddMore')}</span>
                    </Grid>
                  </section>
                  <Grid item className={classes.margin_top}>
                    <CardTextarea
                      name="space_en"
                      label={t('details:listingSpaceEN')}
                      sub_textarea={true}
                      sub_label={t('details:subSpace')}
                      value={values.space_en}
                      classTextField={
                        !!(touched!.space_en && errors.space_en) ? 'textarea error_textarea' : 'textarea'
                      }
                      show_error={!!(touched!.space_en && errors.space_en)}
                      error_message={touched.space_en ? errors.space_en : t('details:defaultError')}
                      title_tooltips={
                        <Fragment>
                          <Typography color="inherit">{t('details:examples')}</Typography>
                          <Typography color="inherit">{t('details:spaceExample1')}</Typography>
                          <Typography color="inherit">{t('details:spaceExample2')}</Typography>
                          <Typography color="inherit">{t('details:spaceExample3')}</Typography>
                        </Fragment>
                      }
                      rows={4}
                      rowsMax={9}
                      max_char={5000}
                      multiline={true}
                      classMaxChar={!!(touched!.space_en && errors.space_en) ? 'error_char' : 'remain_char'}
                      InputProps={{
                        classes: {
                          notchedOutline: !!(touched!.space_en && errors.space_en)
                            ? classes.notchedOutline
                            : ''
                        }
                      }}
                      inputProps={{ maxLength: 5000 }}
                      placeholder={
                        width !== 'xl' && width !== 'lg'
                          ? `${t('details:spaceExample1')} \n${t('details:spaceExample2')}`
                          : ''
                      }
                      handleChange={handleChange}
                      handleBlur={(e) => {
                        handleBlur(e);
                        // console.log(e.currentTarget.value);
                        dispatchDescription({ type: 'setSpaceEN' }, e.currentTarget.value);
                      }}
                    />
                  </Grid>

                  <Grid item className={classes.margin_top}>
                    <CardTextarea
                      name="rules_en"
                      label={t('details:listingRulesEN')}
                      sub_textarea={true}
                      sub_label={t('details:subRules')}
                      value={values.rules_en}
                      classTextField={
                        !!(touched!.rules_en && errors.rules_en) ? 'textarea error_textarea' : 'textarea'
                      }
                      show_error={!!(touched!.rules_en && errors.rules_en)}
                      error_message={touched.rules_en ? errors.rules_en : t('details:defaultError')}
                      title_tooltips={
                        <Fragment>
                          <Typography color="inherit">{t('details:examples')}</Typography>
                          <Typography color="inherit">{t('details:rulesExample1')}</Typography>
                          <Typography color="inherit">{t('details:rulesExample2')}</Typography>
                          <Typography color="inherit">{t('details:rulesExample3')}</Typography>
                        </Fragment>
                      }
                      rows={4}
                      rowsMax={9}
                      max_char={5000}
                      multiline={true}
                      classMaxChar={!!(touched!.rules_en && errors.rules_en) ? 'error_char' : 'remain_char'}
                      InputProps={{
                        classes: {
                          notchedOutline: !!(touched!.rules_en && errors.rules_en)
                            ? classes.notchedOutline
                            : ''
                        }
                      }}
                      inputProps={{ maxLength: 5000 }}
                      placeholder={
                        width !== 'xl' && width !== 'lg'
                          ? `${t('details:rulesExample1')} \n${t('details:rulesExample2')}`
                          : ''
                      }
                      handleChange={handleChange}
                      handleBlur={(e) => {
                        handleBlur(e);
                        dispatchDescription({ type: 'setRulesEN' }, e.currentTarget.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}></Formik>
    </Fragment>
  );
};

export default DescriptionEN;
