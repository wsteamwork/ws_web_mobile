import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IPriceShortTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { Divider, FormControl, Grid, InputAdornment, RadioGroup, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any;
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
      margin: '16px 0'
    },
    radioCustom: {
      height: '100%'
    }
  })
);

const PriceShortTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.stepPrice.listing);
  const priceShort = useSelector<ReducersList, IPriceShortTerm>((state) => state.priceTerm.priceST);
  const dispatch = useDispatch<Dispatch<PriceTermActions>>();
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const [isDiscount, setIsDiscount] = useState<number>(0);
  const [price, setPrice] = useState<IPriceShortTerm>({
    rent_type: 1,
    price_day: 0,
    price_hour: 0,
    price_day_discount: 0,
    price_hour_discount: 0,
    is_discount: 0,
    price_charge_guest: 0,
    price_after_hour: 0,
    cleaning_fee: 0
  });
  const { t } = useTranslation();

  useEffect(() => {
    setPrice({
      rent_type: listing ? listing.short_term_rent_type.rent_type : 1,
      price_day: priceShort ? priceShort.price_day : 0,
      price_hour: priceShort ? priceShort.price_hour : 0,
      price_day_discount: priceShort ? priceShort.price_day_discount : 0,
      price_hour_discount: priceShort ? priceShort.price_hour_discount : 0,
      is_discount: priceShort ? priceShort.is_discount : isDiscount,
      price_charge_guest: priceShort ? priceShort.price_charge_guest : 0,
      price_after_hour: priceShort ? priceShort.price_after_hour : 0,
      cleaning_fee: priceShort ? priceShort.cleaning_fee : 0
    });
  }, [listing, priceShort]);

  useEffect(() => {
    setIsDiscount(priceShort ? priceShort.is_discount : 0)
  }, []);

  useEffect(() => {
    dispatchStep({ type: 'setStep', payload: 'tab1' });
  }, []);

  const changePrice = (name: keyof IPriceShortTerm, value?: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrice({
      ...price,
      [name]: parseInt(event.target.value) || value
    });
  };

  const blurPrice = () => {
    dispatch({ type: 'setPriceST', payload: { ...price } });
  };

  useMemo(() => {
    if (!priceShort || (price.price_day < 100000 || !price.price_day)) {
      dispatchStep({ type: 'setDisableNext', payload: true });
    } else {
      dispatchStep({ type: 'setDisableNext', payload: false });
    }
  }, [price, priceShort]);

  useMemo(() => {
    setIsDiscount(isDiscount);
  }, [isDiscount]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDiscount(parseInt((event.target as HTMLInputElement).value));
  };

  useEffect(() => {
    changePrice('is_discount', isDiscount)
    blurPrice();
  }, [isDiscount])

  return (
    listing && (
      <Grid container>
        <ValidatorForm
          onSubmit={() => {
            return null;
          }}>
          <div>
            <Typography variant="h5" className={classes.bigTitle}>{t('price:shortTermPriceTitle')}</Typography>
            <Typography className={classes.bigTitleSubTitle} variant="subtitle2" gutterBottom>
              {t('price:shortTermPriceSubtitle')}
            </Typography>
            <Grid container className={classes.container} justify="center">
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup value={String(isDiscount)} onChange={handleChange} row>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <RadioCustom
                          label={'Đang giảm giá'}
                          className={classes.radioCustom}
                          value={String(1)}
                          descr={'Chọn mục này để tạo giảm giá'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RadioCustom
                          label={'Không giảm giá'}
                          className={classes.radioCustom}
                          value={String(0)}
                          descr={'Nếu bạn muốn kết thúc giảm giá phòng vui lòng chọn mục này'}
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:priceByDay')}
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  {t('price:priceByDaySubtitle')}
                </Typography>

                <FormControl className={'formControl'} aria-describedby="price_day_helper" required>
                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:100000']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:requirePrice'),
                      t('price:minPriceDay')
                    ]}
                    name="price_day"
                    variant="outlined"
                    value={price.price_day}
                    onChange={changePrice('price_day')}
                    onBlur={blurPrice}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                    }}
                  />
                </FormControl>
              </Grid>
              {isDiscount ? (
                <Grid item xs={12} style={{ marginTop: 12 }}>
                  <Typography className={classes.title} variant="h6" gutterBottom>
                    {t('price:priceByDayDiscount')}
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    {t('price:priceByDayDiscountSubtitle')}
                  </Typography>

                  <FormControl className={'formControl'} aria-describedby="price_day_helper" required>
                    <TextValidator
                      validators={['isNumber', 'minNumber:100000']}
                      errorMessages={[
                        t('price:requirePrice'),
                        t('price:minPriceDay')
                      ]}
                      name="price_day"
                      variant="outlined"
                      value={price.price_day_discount}
                      onChange={changePrice('price_day_discount')}
                      onBlur={blurPrice}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                      }}
                    />
                  </FormControl>
                </Grid>
              ) : (null)}
              {listing.short_term_rent_type.rent_type === 3 ? (
                <Grid item xs={12}>
                  <Divider className={classes.divider} />

                  <Typography className={classes.title} variant="h6" gutterBottom>
                    {t('price:priceByHours')}
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    {t('price:priceByHoursSubtitle')}
                  </Typography>

                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:50000']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:requirePrice'),
                      t('price:minPriceHours')
                    ]}
                    id="outlined-adornment-amount"
                    variant="outlined"
                    value={price.price_hour}
                    onChange={changePrice('price_hour')}
                    onBlur={blurPrice}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                    }}
                  />
                </Grid>
              ) : (
                  ''
                )}

              {listing.short_term_rent_type.rent_type === 3 && isDiscount ? (
                <Grid item xs={12} style={{ marginTop: 12 }}>
                  <Typography className={classes.title} variant="h6" gutterBottom>
                    {t('price:priceByHoursDiscount')}
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    {t('price:priceByHoursDiscountSubtitle')}
                  </Typography>

                  <TextValidator
                    validators={['isNumber', 'minNumber:50000']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:minPriceHours')
                    ]}
                    id="outlined-adornment-amount"
                    variant="outlined"
                    value={price.price_hour_discount}
                    onChange={changePrice('price_hour_discount')}
                    onBlur={blurPrice}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                    }}
                  />
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
          </div>
          <Divider className={classes.divider} />

          <div>
            <Typography variant="h5" className={classes.bigTitle}>{t('price:surchargePriceTitle')}</Typography>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  {t('price:surchargeAdditionalGuests')}
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  {t('price:surchargeAdditionalGuestsSubtitle')}
                </Typography>

                <TextValidator
                  validators={['required', 'isNumber']}
                  errorMessages={[
                    t('price:requirePrice'),
                    t('price:requirePrice')
                  ]}
                  id="outlined-adornment-amount"
                  variant="outlined"
                  value={price.price_charge_guest}
                  onChange={changePrice('price_charge_guest')}
                  onBlur={blurPrice}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                  }}
                />
              </Grid>

              {listing.short_term_rent_type.rent_type === 3 ? (
                <Grid item xs={12}>
                  <Divider className={classes.divider} />

                  <Typography className={classes.title} variant="h6" gutterBottom>
                    {t('price:surchargeAdditionalHours')}
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    {t('price:surchargeAdditionalHoursSubtitle')}
                  </Typography>

                  <TextValidator
                    validators={['required', 'isNumber']}
                    errorMessages={[
                      t('price:requirePrice'),
                      t('price:requirePrice')
                    ]}
                    id="outlined-adornment-amount"
                    variant="outlined"
                    value={price.price_after_hour}
                    onChange={changePrice('price_after_hour')}
                    onBlur={blurPrice}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                      endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                    }}
                  />
                </Grid>
              ) : (
                  ''
                )}
            </Grid>
          </div>
          <Divider className={classes.divider} />
          <div>
            <Typography variant="h5" className={classes.bigTitle}>{t('price:cleaningFeeTitle')}</Typography>

            <Grid container justify="center">
              <Grid item xs={12}>
                {/* <Typography className={classes.title} variant="h6" gutterBottom>
                  Phụ thu dịch vụ dọn dẹp
                </Typography> */}

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  {t('price:cleaningFeeSubtitle')}
                </Typography>

                <TextValidator
                  validators={['required', 'isNumber']}
                  errorMessages={[
                    t('price:requirePrice'),
                    t('price:requirePrice')
                  ]}
                  id="outlined-adornment-amount"
                  variant="outlined"
                  value={price.cleaning_fee}
                  onChange={changePrice('cleaning_fee')}
                  onBlur={blurPrice}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    endAdornment: <InputAdornment position="start"> đ </InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </ValidatorForm>
      </Grid>
    )
  );
};

export default PriceShortTerm;
