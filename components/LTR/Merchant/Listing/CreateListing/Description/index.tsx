import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { DescriptionReducerAction, getDetailDescription, getDetailDescriptionEN, handleTranslateToEnglish } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/description';
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
  name: string;
  description: string;
  space: string;
  rules: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('details:requiredName'))
      .min(10, t('details:name10Character'))
      .max(100, t('details:name100Character')),
    description: Yup.string()
      .required(t('details:requiredDes'))
      .min(50, t('details:des50Character'))
      .max(5000, t('details:des5000Character')),
    space: Yup.string().max(5000, t('details:space5000Character')),
    rules: Yup.string().max(5000, t('details:rules5000Character'))
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

const Description: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { width, router } = useContext(GlobalContext);
  const FormValidationSchema = useValidatation();

  const name = useSelector<ReducersList, string>((state) => state.description.name);
  const description = useSelector<ReducersList, string>((state) => state.description.description);
  const space = useSelector<ReducersList, string>((state) => state.description.space);
  const rules = useSelector<ReducersList, string>((state) => state.description.rules);
  const dispatch_des = useDispatch<Dispatch<DescriptionReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  const id = router.query.id;

  useEffect(() => {
    dispatch_detail({ type: 'setStep', payload: 'tab1' });
  }, []);

  useEffect(() => {
    dispatch_detail({ type: 'setDisableNext', payload: name.length < 5 });
    dispatch_detail({ type: 'setDisableNext', payload: description.length < 50 });
  }, [name, description]);

  const handleSubmitForm: any = () => {
    return {};
  };

  const formikInit: MyDescription = useMemo<MyDescription>(() => {
    return {
      name: name,
      description: description,
      space: space,
      rules: rules
    };
  }, [name, description, space, rules]);

  const dispatchDescription = (typeAction, value) => {
    dispatch_des({ type: typeAction.type, payload: value });
  };
  useEffect(() => {
    getDetailDescription(id, dispatch_des);
    getDetailDescriptionEN(id, dispatch_des);
  }, [id]);
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
                    name="name"
                    label={t('details:listingName')}
                    sub_label={t('details:subName')}
                    value={values.name.replace(/\s+/g, ' ')}
                    classTextField={
                      !!(values.name.length < 10 && touched!.name)
                        ? 'textarea error_textarea'
                        : 'textarea'
                    }
                    show_error={!!(values.name.length < 10 && touched!.name)}
                    error_message={errors.name ? errors.name : t('details:defaultError')}
                    rows={1}
                    rowsMax={1}
                    max_char={100}
                    multiline={true}
                    classMaxChar={
                      !!(values.name.length < 10 && touched!.name) ? 'error_char' : 'remain_char'
                    }
                    InputProps={{
                      classes: {
                        notchedOutline: !!(values.name.length < 10 && touched!.name)
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    autoFocus={true}
                    inputProps={{ maxLength: 100 }}
                    handleChange={(e) => {
                      handleChange(e)
                      dispatchDescription({ type: 'setName' }, e.currentTarget.value);
                      handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                        dispatchDescription({ type: 'setNameEN' }, res);
                      });
                    }}
                    handleBlur={(e) => {
                      handleBlur(e);
                      dispatchDescription({ type: 'setName' }, e.currentTarget.value);
                      handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                        dispatchDescription({ type: 'setNameEN' }, res);
                      });
                    }}
                  />
                  <Divider className={classes.normal_divider} />

                  <CardTextarea
                    name="description"
                    label={t('details:listingDes')}
                    sub_label={t('details:subDes')}
                    value={values.description}
                    classTextField={
                      !!(values.description.length < 50 && touched!.description)
                        ? 'textarea error_textarea'
                        : 'textarea'
                    }
                    show_error={!!(values.description.length < 50 && touched!.description)}
                    error_message={
                      values.description.length < 50 ? errors.description : t('details:defaultError')
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
                      !!(values.description.length < 50 && touched!.description)
                        ? 'error_char'
                        : 'remain_char'
                    }
                    InputProps={{
                      classes: {
                        notchedOutline: !!(
                          values.description.length < 50 &&
                          touched!.description &&
                          errors.description
                        )
                          ? classes.notchedOutline
                          : ''
                      }
                    }}
                    inputProps={{ maxLength: 5000 }}
                    placeholder={width !== 'xl' && width !== 'lg' ? t('details:desExample1') : ''}
                    handleChange={(e) => {
                      dispatchDescription({ type: 'setDescription' }, e.currentTarget.value);
                      handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                        dispatchDescription({ type: 'setDescriptionEN' }, res);
                      });
                    }}
                    handleBlur={(e) => {
                      handleBlur(e);
                      dispatchDescription({ type: 'setDescription' }, e.currentTarget.value);
                      handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                        dispatchDescription({ type: 'setDescriptionEN' }, res);
                      });
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
                      name="space"
                      label={t('details:listingSpace')}
                      sub_textarea={true}
                      sub_label={t('details:subSpace')}
                      value={values.space}
                      classTextField={
                        !!(touched!.space && errors.space) ? 'textarea error_textarea' : 'textarea'
                      }
                      show_error={!!(touched!.space && errors.space)}
                      error_message={touched.space ? errors.space : t('details:defaultError')}
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
                      classMaxChar={!!(touched!.space && errors.space) ? 'error_char' : 'remain_char'}
                      InputProps={{
                        classes: {
                          notchedOutline: !!(touched!.space && errors.space)
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
                      handleChange={(e) => {
                        handleChange(e)
                        dispatchDescription({ type: 'setSpace' }, e.currentTarget.value);
                        handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                          dispatchDescription({ type: 'setSpaceEN' }, res);
                        });
                      }}
                      handleBlur={(e) => {
                        handleBlur(e);
                        dispatchDescription({ type: 'setSpace' }, e.currentTarget.value);
                        handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                          dispatchDescription({ type: 'setSpaceEN' }, res);
                        });
                      }}
                    />
                  </Grid>

                  <Grid item className={classes.margin_top}>
                    <CardTextarea
                      name="rules"
                      label={t('details:listingRules')}
                      sub_textarea={true}
                      sub_label={t('details:subRules')}
                      value={values.rules}
                      classTextField={
                        !!(touched!.rules && errors.rules) ? 'textarea error_textarea' : 'textarea'
                      }
                      show_error={!!(touched!.rules && errors.rules)}
                      error_message={touched.rules ? errors.rules : t('details:defaultError')}
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
                      classMaxChar={!!(touched!.rules && errors.rules) ? 'error_char' : 'remain_char'}
                      InputProps={{
                        classes: {
                          notchedOutline: !!(touched!.rules && errors.rules)
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
                      handleChange={(e) => {
                        handleChange(e)
                        dispatchDescription({ type: 'setRules' }, e.currentTarget.value);
                        handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                          dispatchDescription({ type: 'setRulesEN' }, res);
                        });
                      }}
                      handleBlur={(e) => {
                        handleBlur(e);
                        dispatchDescription({ type: 'setRules' }, e.currentTarget.value);
                        handleTranslateToEnglish(e.currentTarget.value).then((res) => {
                          dispatchDescription({ type: 'setRulesEN' }, res);
                        });
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

export default Description;
