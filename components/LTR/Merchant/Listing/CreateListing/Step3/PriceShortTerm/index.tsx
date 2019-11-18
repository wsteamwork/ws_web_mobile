import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IPriceShortTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { Divider, FormControl, Grid, InputAdornment, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useMemo, useState } from 'react';
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
      margin: '32px 0'
    },
    divider: {
      margin: '16px 0'
    }
  })
);

const PriceShortTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.stepPrice.listing);
  const priceShort = useSelector<ReducersList, IPriceShortTerm>((state) => state.priceTerm.priceST);
  const dispatch = useDispatch<Dispatch<PriceTermActions>>();
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();
  const [price, setPrice] = useState<IPriceShortTerm>({
    rent_type: 1,
    price_day: 0,
    price_hour: 0,
    price_charge_guest: 0,
    price_after_hour: 0,
    cleaning_fee: 0
  });

  useEffect(() => {
    setPrice({
      rent_type: listing ? listing.short_term_rent_type.rent_type : 1, 
      price_day: priceShort ? priceShort.price_day : 0,
      price_hour: priceShort ? priceShort.price_hour : 0,
      price_charge_guest: priceShort ? priceShort.price_charge_guest : 0,
      price_after_hour: priceShort ? priceShort.price_after_hour : 0,
      cleaning_fee: priceShort ? priceShort.cleaning_fee : 0
    });
  }, [listing,priceShort]);

  useEffect(() => {
    dispatchStep({ type: 'setStep', payload: 'tab1' });
  }, []);

  const changePrice = (name: keyof IPriceShortTerm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrice({
      ...price,
      [name]: parseInt(event.target.value)
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

  return (
    listing && (
      <Grid container>
        <ValidatorForm
          onSubmit={() => {
            return null;
          }}>
          <div>
            <h1 className={classes.bigTitle}>Giá cơ bản</h1>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Giá theo ngày
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  Đây là giá cơ bản cho một ngày. Nếu không phụ thu thêm giá khác, giá này sẽ được
                  áp dụng cho tất cả các ngày trong căn hộ của bạn.
                </Typography>

                <FormControl className={'formControl'} aria-describedby="price_day_helper" required>
                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:100000']}
                    errorMessages={[
                      'Bạn cần nhập giá cho trường này',
                      'Bạn cần nhập giá cho trường này',
                      'Giá tối thiểu của hình thức thuê theo ngày là : 100.000đ'
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

              {listing.short_term_rent_type.rent_type === 3 ? (
                <Grid item xs={12}>
                  <Divider className={classes.divider} />

                  <Typography className={classes.title} variant="h6" gutterBottom>
                    Giá theo giờ
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    Đây là giá cơ bản cho một ngày. Nếu không phụ thu thêm giá khác, giá này sẽ được
                    áp dụng cho tất cả các ngày trong căn hộ của bạn.
                  </Typography>

                  <TextValidator
                    validators={['required', 'isNumber', 'minNumber:50000']}
                    errorMessages={[
                      'Bạn cần nhập giá cho trường này',
                      'Bạn cần nhập giá cho trường này',
                      'Giá tối thiểu của hình thức thuê theo giờ là : 50.000đ'
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
            </Grid>
          </div>
          <div>
            <h1 className={classes.bigTitle}>Giá phụ thu</h1>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Phụ thu khi thêm người
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  Đây là giá phụ thu khi tăng thêm mỗi khách, hệ thống sẽ tự động tính vào tiền đặt
                  căn hộ của khách.
                </Typography>

                <TextValidator
                  validators={['required', 'isNumber']}
                  errorMessages={[
                    'Bạn cần nhập giá cho trường này',
                    'Bạn cần nhập giá cho trường này'
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
                    Phụ thu khi khách ở thêm giờ
                  </Typography>

                  <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                    Đây là giá phụ thu khi khách đặt thêm giờ, bắt đầu từ sau 4 giờ, cứ mỗi giờ tiếp
                    theo hệ thống sẽ tự động tính vào tiền đặt căn hộ của khách.
                  </Typography>

                  <TextValidator
                    validators={['required', 'isNumber']}
                    errorMessages={[
                      'Bạn cần nhập giá cho trường này',
                      'Bạn cần nhập giá cho trường này'
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
          <div>
            <h1 className={classes.bigTitle}>Phí dọn dẹp</h1>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Phụ thu dịch vụ dọn dẹp
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  Đây là giá phụ thu dọn dẹp sau khi khách checkout, để thu hút khách chúng tôi
                  khuyên bạn nên thiết lập giá này sau.
                </Typography>

                <TextValidator
                  validators={['required', 'isNumber']}
                  errorMessages={[
                    'Bạn cần nhập giá cho trường này',
                    'Bạn cần nhập giá cho trường này'
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
