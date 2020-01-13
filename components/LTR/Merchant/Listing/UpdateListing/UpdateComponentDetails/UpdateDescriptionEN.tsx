import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { DescriptionReducerAction, getDetailDescriptionEN } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/description';
import { handleUpdateListing, ListingDetailsReducerAction } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Formik, FormikProps } from 'formik';
import React, { FC, Fragment, SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import CardTextarea from '../../CreateListing/Description/CardTextarea';
import CardWrapperUpdate from '../CardWrapperUpdate';
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
      .min(15, t('details:name10Character'))
      .max(100, t('details:name100Character')),
    description: Yup.string()
      .required(t('details:requiredDes'))
      .min(50, t('details:des50Character'))
      .max(5000, t('details:des5000Character')),
    space: Yup.string().max(1000, t('details:space5000Character')),
    rules: Yup.string().max(5000, t('details:rules5000Character'))
  });

  return FormValidationSchema;
};
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1),
      color: '#484848'
    },
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

const UpdateDescription: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { width, router } = useContext(GlobalContext);
  const FormValidationSchema = useValidatation();

  const room_id = useSelector<ReducersList, number>((state) => state.description.room_id);
  const name = useSelector<ReducersList, string>((state) => state.description.name_en);
  const description = useSelector<ReducersList, string>((state) => state.description.description_en);
  const space = useSelector<ReducersList, string>((state) => state.description.space_en);
  const rules = useSelector<ReducersList, string>((state) => state.description.rules_en);
  const lang = useSelector<ReducersList, string>((state) => state.description.lang_en);
  // const detail_en = useSelector<ReducersList, string>((state) => state.description.detail_en);
  const disable_save = useSelector<ReducersList, boolean>(
    (state) => state.listingdetails.disable_save
  );
  const dispatch_des = useDispatch<Dispatch<DescriptionReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<ListingDetailsReducerAction>>();
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>("Cập nhật thành công");
  const [statusSnack, setStatusSnack] = useState<string>("success");
  const id = router.query.id;
  useEffect(() => {
    getDetailDescriptionEN(id, dispatch_des);
  }, [id]);

  useMemo(() => {
    if (name.length < 10 || description.length < 30) {
      dispatch_detail({ type: 'setDisableSave', payload: true });
    } else {
      dispatch_detail({ type: 'setDisableSave', payload: false });
    }
  }, [name, description]);

  const handleSubmitForm: any = () => {
    return {};
  };
  const updateDescription: any = () => {
    const res = handleUpdateListing(room_id, {
      about_room: {
        en: {
          name: name,
          description: description,
          space: space,
          lang: lang,
          note: rules
        }
      }
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack("Cập nhật mô tả căn hộ thành công !")
    }
    else {
      setOpenSnack(true);
      setStatusSnack("error");
      setMessageSnack("Cập nhật mô tả căn hộ thất bại !")
    }
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

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate disabledSave={disable_save} handleSave={updateDescription} openSnack={openSnack} messageSnack={messageSnack} handleCloseSnack={handleCloseSnack}>
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
                  <Grid item xs={12}>
                    <CardTextarea
                      name="name"
                      label={t('details:listingNameEN')}
                      sub_label={t('details:subName')}
                      value={values.name.replace(/\s+/g, ' ')}
                      classTextField={
                        !!(values.name.length < 15 && touched!.name && errors.name)
                          ? 'textarea error_textarea'
                          : 'textarea'
                      }
                      show_error={!!(values.name.length < 15 && touched!.name && errors.name)}
                      error_message={errors.name ? errors.name : t('details:defaultError')}
                      rows={1}
                      rowsMax={1}
                      max_char={100}
                      multiline={true}
                      classMaxChar={
                        !!(values.name.length < 15 && touched!.name && errors.name)
                          ? 'error_char'
                          : 'remain_char'
                      }
                      InputProps={{
                        classes: {
                          notchedOutline: !!(values.name.length < 15 && touched!.name && errors.name)
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
                        // if (e.currentTarget.value.length > 14) {
                        dispatchDescription({ type: 'setNameEN' }, e.currentTarget.value);
                        // }
                      }}
                    />

                    <Divider className={classes.normal_divider} />

                    <CardTextarea
                      name="description"
                      label={t('details:listingDesEN')}
                      sub_label={t('details:subDes')}
                      value={values.description.replace(/\s+/g, ' ')}
                      classTextField={
                        !!(
                          values.description.length < 30 &&
                          touched!.description &&
                          errors.description
                        )
                          ? 'textarea error_textarea'
                          : 'textarea'
                      }
                      show_error={
                        !!(
                          values.description.length < 30 &&
                          touched!.description &&
                          errors.description
                        )
                      }
                      error_message={
                        values.description.length < 30
                          ? errors.description
                          : t('details:defaultError')
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
                        !!(
                          values.description.length < 30 &&
                          touched!.description &&
                          errors.description
                        )
                          ? 'error_char'
                          : 'remain_char'
                      }
                      InputProps={{
                        classes: {
                          notchedOutline: !!(
                            values.description.length < 30 &&
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
                        handleChange(e)
                        dispatchDescription({ type: 'setDescriptionEN' }, e.currentTarget.value);
                      }}
                      handleBlur={(e) => {
                        handleBlur(e);
                        // if (e.currentTarget.value.length > 49) {
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
                        name="space"
                        label={t('details:listingSpaceEN')}
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
                        max_char={1000}
                        multiline={true}
                        classMaxChar={
                          !!(touched!.space && errors.space) ? 'error_char' : 'remain_char'
                        }
                        InputProps={{
                          classes: {
                            notchedOutline: !!(touched!.space && errors.space)
                              ? classes.notchedOutline
                              : ''
                          }
                        }}
                        inputProps={{ maxLength: 1000 }}
                        placeholder={
                          width !== 'xl' && width !== 'lg'
                            ? `${t('details:spaceExample1')} \n${t('details:spaceExample2')}`
                            : ''
                        }
                        handleChange={(e) => {
                          handleChange(e)
                          dispatchDescription({ type: 'setSpaceEN' }, e.currentTarget.value);
                        }}
                        handleBlur={(e) => {
                          handleBlur(e);
                          dispatchDescription({ type: 'setSpaceEN' }, e.currentTarget.value);
                        }}
                      />
                    </Grid>

                    <Grid item className={classes.margin_top}>
                      <CardTextarea
                        name="rules"
                        label={t('details:listingRulesEN')}
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
                        classMaxChar={
                          !!(touched!.rules && errors.rules) ? 'error_char' : 'remain_char'
                        }
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
                          dispatchDescription({ type: 'setRulesEN' }, e.currentTarget.value);
                        }}
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
      </CardWrapperUpdate>
    </Fragment>
  );
};
export default UpdateDescription;
