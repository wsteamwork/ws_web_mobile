import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IPriceLongTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { calcPercentage } from '@/utils/mixins';
import { Button, Divider, Grid, InputAdornment, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any;
}

interface IPercent {
  term_1_month?: string;
  term_2_month?: string;
  term_3_month?: string;
  term_6_month?: string;
  term_12_month?: string;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)'
    },
    bigTitle: {
      margin: '8px 0'
    },
    bigTitleSubTitle: {
      marginBottom: 32
    },
    divider: {
      margin: '32px 0'
    },
    rowMargin: {
      marginTop: 12
    },
    btnTip: {
      padding: '0px 8px',
      minWidth: 0,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    txtPercent: {
      color: '#2196f3'
    }
  })
);

const LongTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const priceLong = useSelector<ReducersList, IPriceLongTerm>((state) => state.priceTerm.priceLT);
  const priceLongUSD = useSelector<ReducersList, IPriceLongTerm>((state) => state.priceTerm.priceLTUSD);
  const dispatch = useDispatch<Dispatch<PriceTermActions>>();
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const { t } = useTranslation();

  const [price, setPrice] = useState<IPriceLongTerm>({
    term_1_month: 0,
    term_2_month: 0,
    term_3_month: 0,
    term_6_month: 0,
    term_12_month: 0
  });

  const [priceUSD, setPriceUSD] = useState<IPriceLongTerm>({
    term_1_month: 0,
    term_2_month: 0,
    term_3_month: 0,
    term_6_month: 0,
    term_12_month: 0
  });

  useEffect(() => {
    setPrice({
      term_1_month: priceLong ? priceLong.term_1_month : 0,
      term_2_month: priceLong ? priceLong.term_2_month : 0,
      term_3_month: priceLong ? priceLong.term_3_month : 0,
      term_6_month: priceLong ? priceLong.term_6_month : 0,
      term_12_month: priceLong ? priceLong.term_12_month : 0
    });

    // setPriceUSD({
    //   term_1_month: priceLong ? Math.ceil(priceLong.term_1_month / 22500) : 0,
    //   term_2_month: priceLong ? Math.ceil(priceLong.term_2_month / 22500) : 0,
    //   term_3_month: priceLong ? Math.ceil(priceLong.term_3_month / 22500) : 0,
    //   term_6_month: priceLong ? Math.ceil(priceLong.term_6_month / 22500) : 0,
    //   term_12_month: priceLong ? Math.ceil(priceLong.term_12_month / 22500) : 0
    // });
  }, [priceLong]);

  useEffect(() => {
    setPriceUSD({
      term_1_month: priceLongUSD ? priceLongUSD.term_1_month : 0,
      term_2_month: priceLongUSD ? priceLongUSD.term_2_month : 0,
      term_3_month: priceLongUSD ? priceLongUSD.term_3_month : 0,
      term_6_month: priceLongUSD ? priceLongUSD.term_6_month : 0,
      term_12_month: priceLongUSD ? priceLongUSD.term_12_month : 0
    });
  }, [priceLongUSD]);

  const [pricePercent, setPricePercent] = useState<IPercent>({
    term_2_month: '',
    term_3_month: '',
    term_6_month: '',
    term_12_month: ''
  });

  useEffect(() => {
    dispatchStep({ type: 'setStep', payload: 'tab2' });
  }, []);

  const handleChange = (name: keyof IPriceLongTerm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrice({
      ...price,
      [name]: parseInt(event.target.value)
    });
    // dispatch({ type: 'setPriceLT', payload: { ...price } });

    setPricePercent({
      ...pricePercent,
      [name]: calcPercentage(parseInt(event.target.value), price.term_1_month)
    });
  };
  const handleChangeUSD = (name: keyof IPriceLongTerm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceUSD({
      ...priceUSD,
      [name]: parseInt(event.target.value)
    });
    // dispatch({ type: 'setPriceLTUSD', payload: { ...priceUSD } });

  };

  useEffect(() => {
    setPricePercent({
      term_2_month: calcPercentage(price.term_2_month, price.term_1_month),
      term_3_month: calcPercentage(price.term_3_month, price.term_1_month),
      term_6_month: calcPercentage(price.term_6_month, price.term_1_month),
      term_12_month: calcPercentage(price.term_12_month, price.term_1_month)
    });
  }, [price]);

  const handleTip = (typePrice: keyof IPriceLongTerm, percent: number) => {
    setPrice({
      ...price,
      [typePrice]: price.term_1_month - price.term_1_month * percent
    });
  };

  const handleBlur = () => {
    dispatch({ type: 'setPriceLT', payload: { ...price } });
  };
  const handleBlurUSD = () => {
    dispatch({ type: 'setPriceLTUSD', payload: { ...priceUSD } });
  };

  useMemo(() => {
    if (
      !priceLong ||
      !(
        price.term_1_month &&
        price.term_2_month &&
        price.term_3_month &&
        price.term_6_month &&
        price.term_12_month
      ) || !priceLongUSD || !(
        priceUSD.term_1_month &&
        priceUSD.term_2_month &&
        priceUSD.term_3_month &&
        priceUSD.term_6_month &&
        priceUSD.term_12_month
      )
    ) {
      dispatchStep({ type: 'setDisableNext', payload: true });
    } else {
      dispatchStep({ type: 'setDisableNext', payload: false });
    }
  }, [price, priceUSD]);

  return (
    <Fragment>
      <ValidatorForm
        onSubmit={() => {
          return null;
        }}>
        <div>
          <div>
            <Typography variant="h5" className={classes.bigTitle}>{t('price:longTermPriceTitle')}</Typography>
            <Typography className={classes.bigTitleSubTitle} variant="subtitle2" gutterBottom>
              {t('price:longTermPriceSubtitle')}
            </Typography>
            <Grid container>
              <Typography className={classes.title} variant="h6" gutterBottom>
                {t('price:longTerm1MonthPrices')}
              </Typography>

              <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                {t('price:longTerm1MonthPricesSubtitle')}
              </Typography>
              <Grid container spacing={4} alignItems="center">
                <Grid item>
                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:5000000']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:requirePrice'),
                      t('price:minLongTermPrice')
                    ]}
                    variant="outlined"
                    value={price.term_1_month}
                    onChange={handleChange('term_1_month')}
                    onBlur={handleBlur}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      startAdornment: <InputAdornment position="start"> đ </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:250']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:requirePrice'),
                      t('price:minLongTermPrice')
                    ]}
                    variant="outlined"
                    value={priceUSD.term_1_month}
                    onChange={handleChangeUSD('term_1_month')}
                    onBlur={handleBlurUSD}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      startAdornment: <InputAdornment position="start"> USD </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Divider className={classes.divider} />

          <div>
            <Typography variant="h5" className={classes.bigTitle}>{t('price:otherRentalTermTitle')}</Typography>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:longTerm2MonthPrices')}
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!price.term_1_month}
                      variant="outlined"
                      value={price.term_2_month}
                      onChange={handleChange('term_2_month')}
                      onBlur={handleBlur}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> đ </InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!priceUSD.term_1_month}
                      variant="outlined"
                      value={priceUSD.term_2_month}
                      onChange={handleChangeUSD('term_2_month')}
                      onBlur={handleBlurUSD}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> USD </InputAdornment>
                      }}
                    />
                  </Grid>
                  {price.term_2_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_2_month}</b> {t('price:compareToBasicPrice')}{' '}
                      </Typography>
                    </Grid>
                  ) : (
                      ''
                    )}
                </Grid>

                <div className={classes.rowMargin}>
                  <span>{t('price:suggestion')} </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_2_month', 0.03)}>
                    3%
                  </Button>
                  <span>
                    {' '}
                    {t('price:suggestPrice')}{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:longTerm3MonthPrices')}
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!price.term_1_month}
                      variant="outlined"
                      value={price.term_3_month}
                      onChange={handleChange('term_3_month')}
                      onBlur={handleBlur}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> đ </InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!priceUSD.term_1_month}
                      variant="outlined"
                      value={priceUSD.term_3_month}
                      onChange={handleChangeUSD('term_3_month')}
                      onBlur={handleBlurUSD}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> USD </InputAdornment>
                      }}
                    />
                  </Grid>
                  {price.term_3_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_3_month}</b> {t('price:compareToBasicPrice')}{' '}
                      </Typography>
                    </Grid>
                  ) : (
                      ''
                    )}
                </Grid>

                <div className={classes.rowMargin}>
                  <span>{t('price:suggestion')} </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_3_month', 0.05)}>
                    5%
                  </Button>
                  <span>
                    {' '}
                    {t('price:suggestPrice')}{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:longTerm6MonthPrices')}
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!price.term_1_month}
                      variant="outlined"
                      value={price.term_6_month}
                      onChange={handleChange('term_6_month')}
                      onBlur={handleBlur}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> đ </InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!priceUSD.term_1_month}
                      variant="outlined"
                      value={priceUSD.term_6_month}
                      onChange={handleChangeUSD('term_6_month')}
                      onBlur={handleBlurUSD}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> USD </InputAdornment>
                      }}
                    />
                  </Grid>
                  {price.term_6_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_6_month}</b> {t('price:compareToBasicPrice')}{' '}
                      </Typography>
                    </Grid>
                  ) : (
                      ''
                    )}
                </Grid>
                <div className={classes.rowMargin}>
                  <span>{t('price:suggestion')} </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_6_month', 0.07)}>
                    7%
                  </Button>
                  <span>
                    {' '}
                    {t('price:suggestPrice')}{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:longTerm12MonthPrices')}
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!price.term_1_month}
                      variant="outlined"
                      value={price.term_12_month}
                      onChange={handleChange('term_12_month')}
                      onBlur={handleBlur}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> đ </InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:requirePrice')
                      ]}
                      disabled={!priceUSD.term_1_month}
                      variant="outlined"
                      value={priceUSD.term_12_month}
                      onChange={handleChangeUSD('term_12_month')}
                      onBlur={handleBlurUSD}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        startAdornment: <InputAdornment position="start"> USD </InputAdornment>
                      }}
                    />
                  </Grid>
                  {price.term_12_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_12_month}</b> {t('price:compareToBasicPrice')}{' '}
                      </Typography>
                    </Grid>
                  ) : (
                      ''
                    )}
                </Grid>
                <div className={classes.rowMargin}>
                  <span>{t('price:suggestion')} </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_12_month', 0.11)}>
                    11%
                  </Button>
                  <span>
                    {' '}
                    {t('price:suggestPrice')}{' '}
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </ValidatorForm>
    </Fragment>
  );
};

export default LongTerm;
