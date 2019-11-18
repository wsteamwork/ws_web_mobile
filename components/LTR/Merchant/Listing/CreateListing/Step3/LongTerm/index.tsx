import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceTermActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import { StepPricesActions } from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import { IPriceLongTerm } from '@/types/Requests/LTR/CreateListing/Step3/PriceTerm';
import { calcPercentage } from '@/utils/mixins';
import { Button, Divider, Grid, InputAdornment, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
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
      margin: '24px 0'
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
  const {} = props;
  const priceLong = useSelector<ReducersList, IPriceLongTerm>((state) => state.priceTerm.priceLT);
  const dispatch = useDispatch<Dispatch<PriceTermActions>>();
  const dispatchStep = useDispatch<Dispatch<StepPricesActions>>();

  const [price, setPrice] = useState<IPriceLongTerm>({
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
  }, [priceLong]);

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
    setPricePercent({
      ...pricePercent,
      [name]: calcPercentage(parseInt(event.target.value), price.term_1_month)
    });
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

    dispatch({ type: 'setPriceLT', payload: { ...price } });
  };

  const handleBlur = () => {
    dispatch({ type: 'setPriceLT', payload: { ...price } });
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
      )
    ) {
      dispatchStep({ type: 'setDisableNext', payload: true });
    } else {
      dispatchStep({ type: 'setDisableNext', payload: false });
    }
  }, [price, priceLong]);

  return (
    <Fragment>
      <ValidatorForm
        onSubmit={() => {
          return null;
        }}>
        <div>
          <div>
            <h1 className={classes.bigTitle}>Giá cơ bản</h1>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Giá theo tháng (chưa tính hóa đơn)
                </Typography>

                <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>
                  Đây là giá tối thiểu từ 1 tháng - 2 tháng
                </Typography>

                <TextValidator
                  validators={['required', 'isNumber', 'minNumber:500000']}
                  errorMessages={[
                    'Bạn cần nhập giá cho trường này',
                    'Bạn cần nhập giá cho trường này',
                    'Giá tối thiểu của hình thức thuê theo tháng là : 500.000'
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
            </Grid>
          </div>

          <div>
            <h1 className={classes.bigTitle}>Giá theo kì hạn</h1>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Kì hạn 2 - 3 tháng
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        'Bạn cần nhập giá cho trường này',
                        'Bạn cần nhập giá cho trường này'
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
                  {price.term_2_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_2_month}</b> so với giá cơ bản{' '}
                      </Typography>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>

                <div className={classes.rowMargin}>
                  <span>Gợi ý: </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_2_month', 0.03)}>
                    3%
                  </Button>
                  <span>
                    {' '}
                    là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì
                    hạn này{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Kì hạn 3 - 6 tháng
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        'Bạn cần nhập giá cho trường này',
                        'Bạn cần nhập giá cho trường này'
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
                  {price.term_3_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_3_month}</b> so với giá cơ bản{' '}
                      </Typography>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>

                <div className={classes.rowMargin}>
                  <span>Gợi ý: </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_3_month', 0.05)}>
                    5%
                  </Button>
                  <span>
                    {' '}
                    là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì
                    hạn này{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Kì hạn 6 - 12 tháng
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        'Bạn cần nhập giá cho trường này',
                        'Bạn cần nhập giá cho trường này'
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
                  {price.term_6_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_6_month}</b> so với giá cơ bản{' '}
                      </Typography>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
                <div className={classes.rowMargin}>
                  <span>Gợi ý: </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_6_month', 0.1)}>
                    10%
                  </Button>
                  <span>
                    {' '}
                    là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì
                    hạn này{' '}
                  </span>
                </div>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6" gutterBottom>
                  Kì hạn từ 1 năm trở lên
                </Typography>

                <Grid container spacing={4} alignItems="center">
                  <Grid item>
                    <TextValidator
                      validators={['required', 'isNumber']}
                      errorMessages={[
                        'Bạn cần nhập giá cho trường này',
                        'Bạn cần nhập giá cho trường này'
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
                  {price.term_12_month ? (
                    <Grid item xs>
                      <Typography className={classes.txtPercent}>
                        <b>{pricePercent.term_12_month}</b> so với giá cơ bản{' '}
                      </Typography>
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
                <div className={classes.rowMargin}>
                  <span>Gợi ý: </span>
                  <Button
                    color="primary"
                    className={classes.btnTip}
                    disabled={!price.term_1_month}
                    onClick={() => handleTip('term_12_month', 0.15)}>
                    15%
                  </Button>
                  <span>
                    {' '}
                    là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì
                    hạn này{' '}
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
