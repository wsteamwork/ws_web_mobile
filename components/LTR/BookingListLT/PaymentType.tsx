import React, { FC, useState, ChangeEvent, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  FormControl,
  RadioGroup,
  Radio,
  Link
} from '@material-ui/core';
import { TransitionCustom } from '@/components/Book/BookingForm';
import CloseIcon from '@material-ui/icons/Close';
import TooltipPayment from '@/components/Book/BookingForm/TooltipPayment';
import { useTranslation } from 'react-i18next';
import ButtonGlobal from '@/components/ButtonGlobal';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { PaymentMethod } from '../LTBook/BookingForm';
import { LTBookingCreateReq } from '@/types/Requests/Booking/BookingRequests';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { LTBookingIndexRes } from '@/types/Requests/Booking/BookingResponses';
import { KeyboardArrowRightRounded } from '@material-ui/icons';
interface IProps {
  classes?: any;
  open: boolean;
  booking: LTBookingIndexRes;
  handleClose: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customDialog: {
      position: 'absolute',
      bottom: '0%',
      width: '95%',
      left: '50%',
      margin: '0',
      maxWidth: '98% !important',
      transform: 'translate(-50%, -3%)',
      borderRadius: 16,
      height: '280px'
    },
    customDialogTitle: {
      padding: 0,
      paddingTop: 8
    },
    termsAndCondition: {
      marginTop: 8
    },
    center: {
      textAlign: 'center',
      fontWeight: 600
    },
    arrow: {
      marginTop: 3,
    }
  })
);

const PaymentType: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { handleClose, open, booking } = props;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payment1');
  const handleChange = (event: ChangeEvent<{}>, value: PaymentMethod) => {
    setPaymentMethod(value);
  };
  const { router } = useContext(GlobalContext);

  const handleSubmitForm = async () => {
    try {
      let query = {
        uuid: booking.contracts.data[0].uuid
      };
      if (paymentMethod === 'payment1') {
        router.push({
          pathname: '/long-term-booking/payment/direct',
          query
        });
      } else {
        router.push({
          pathname: '/long-term-booking/payment/invoice',
          query
        });
      }
    } catch (error) {}
  };
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Dialog
          scroll="body"
          TransitionComponent={TransitionCustom}
          open={open}
          classes={{
            paperScrollBody: classes.customDialog
          }}
          onClose={handleClose}>
          <DialogTitle
            disableTypography
            classes={{
              root: classes.customDialogTitle
            }}>
            <Typography variant="h6" className={classes.center}>
            {t('longtermbooking:paymentMethod')}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} className="formBooking">
              <Grid container>
                <Grid item>
                  <FormControl component="fieldset">
                    <Typography variant="body1">{t('longtermbooking:chooseMethod')}</Typography>
                    <RadioGroup name="paymentMethod" value={paymentMethod} onChange={handleChange}>
                      <FormControlLabel
                        value="payment1"
                        control={<Radio style={{ color: '#673ab7' }} />}
                        label={
                          <p>
                            {t('book:bookingForm:directTransfer')} <TooltipPayment />
                          </p>
                        }
                      />
                      <FormControlLabel
                        value="payment2"
                        control={<Radio style={{ color: '#673ab7' }} />}
                        label={
                          <p>
                            {t('book:bookingForm:transferMoney')}{' '}
                            <a href="https://www.baokim.vn/" target="_blank">
                              Bảo Kim
                            </a>
                          </p>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                  <ButtonGlobal
                    background="linear-gradient(to right, #667eea, #764ba2)"
                    variant="contained"
                    name="confirm-information"
                    size="large"
                    color="primary"
                    onClick={handleSubmitForm}
                    type="submit">
                    {t('longtermbooking:next')}
                    <KeyboardArrowRightRounded className={classes.arrow}/>
                  </ButtonGlobal>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.termsAndCondition}>
              <Typography variant="body2">
                {t('book:bookingForm:desFooter')}{' '}
                <Link href="/terms-and-conditions">
                  {t('book:bookingForm:termsCondition')}
                </Link>
                {t('book:bookingForm:privatePolicy')}
              </Typography>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};
export default PaymentType;
