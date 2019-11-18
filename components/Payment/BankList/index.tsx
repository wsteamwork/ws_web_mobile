import React, { Fragment, useContext, useState, useEffect, FC } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Divider,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { INTERNET_BANKING, VISA } from '@/utils/store/global';
import {
  BaoKimBankInfo,
  PaymentMethod,
  PaymentBankListRes
} from '@/types/Requests/Payment/PaymentResponse';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import classNames from 'classnames';
import '@/styles/components/shared/payment_hover.scss';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { useSelector } from 'react-redux';
import ButtonGlobal from '@/components/ButtonGlobal';
import { windowExist } from '@/store/Redux';
import { redirectToBaoKim } from '@/store/Redux/Reducers/Book/book';
import { useTranslation } from 'react-i18next';

const BankList: FC = (props) => {
  const { t } = useTranslation();
  const [listBank, setListBank] = useState<BaoKimBankInfo[]>([]);
  const [visa, setVisa] = useState<BaoKimBankInfo[]>([]);
  const [bankId, setBankId] = useState<number>(0);
  const [paymentPending, setPaymentPending] = useState<boolean>(false);

  const payment_methods = useSelector<ReducersList, PaymentMethod[]>(
    (state) => state.book.dataInvoice.bank_list
  );
  const lists = useSelector<ReducersList, PaymentBankListRes>((state) => state.book.dataInvoice);
  const { width } = useContext(GlobalContext);
  const xsMode = width === 'xs';

  const changeBankId = (id: number) => {
    setBankId(id);
  };

  const triggerPayment = async () => {
    if (bankId !== 0) {
      setPaymentPending(true);

      try {
        const url = await redirectToBaoKim(lists.uuid, bankId);
        setPaymentPending(false);
        windowExist && window.location.replace(url);
      } catch (error) {
        setPaymentPending(false);
      }
    } else {
      alert(t('payment:invoice:pleasePayment'));
    }
  };

  useEffect(() => {
    _.map(payment_methods, (o) => {
      if (o.payment_method === INTERNET_BANKING) {
        setListBank(o.banks);
      } else if (o.payment_method === VISA) {
        setVisa(o.banks);
      }
    });
  }, [payment_methods]);

  return (
    <Fragment>
      <Paper className="bankList">
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6">{t('payment:invoice:infoBill')}</Typography>
            <Typography variant="subtitle2">
              {t('payment:invoice:selectPayment')}{' '}
              <a
                href="https://www.baokim.vn/"
                target="_blank"
                style={{
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#4285F4'
                }}>
                Bảo Kim
              </a>
            </Typography>
            <Divider className={'divider'} />
          </Grid>
          <Grid item md={12} xs={12}>
            <ExpansionPanel elevation={0} defaultExpanded={!xsMode}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{
                  content: 'alignCenter'
                }}>
                <img src="/static/images/atm-card.png" alt="Internet Banking" />
                <Typography className={'typo'}> {t('payment:invoice:paymentVia')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'details'}>
                <Grid container spacing={8}>
                  <Grid item md={12} xs={12}>
                    <i className={'caption'}>{t('payment:invoice:desVia1')}</i>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography variant="subtitle2"> {t('payment:invoice:note')}</Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <i className={'caption'}>{t('payment:invoice:desVia2')}</i>
                    <br />
                    <i className={'caption'}>{t('payment:invoice:desVia3')}</i>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <ul className="sibling-fade">
                      {listBank.length > 0 ? (
                        _.map(listBank, (bank) => (
                          <li
                            key={bank.id}
                            title={bank.name}
                            className={'bankList'}
                            onClick={() => changeBankId(bank.id)}>
                            <img
                              src={bank.logo_url}
                              alt={bank.name}
                              className={classNames('bankImg', {
                                bankImgFocus: bank.id === bankId
                              })}
                            />
                          </li>
                        ))
                      ) : (
                        <SimpleLoader width={100} />
                      )}
                    </ul>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Divider />
            <ExpansionPanel elevation={0} defaultExpanded={!xsMode}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{
                  content: 'alignCenter'
                }}>
                <img src="/static/images/visa.png" alt="Visa / Mastercard" />
                <Typography className={'typo'}>{t('payment:invoice:payMasterCard')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={'details'}>
                <Grid container spacing={8}>
                  <Grid item md={12} xs={12}>
                    <ul className={'ulBank'}>
                      {visa.length > 0 ? (
                        _.map(visa, (bank) => (
                          <li
                            key={bank.id}
                            title={bank.name}
                            className={'bankList'}
                            onClick={() => changeBankId(bank.id)}>
                            <img
                              src={bank.logo_url}
                              alt={bank.name}
                              className={classNames('bankImg', {
                                bankImgFocus: bank.id === bankId
                              })}
                            />
                          </li>
                        ))
                      ) : (
                        <SimpleLoader width={100} />
                      )}
                    </ul>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item md={12} xs={12}>
            <ButtonGlobal
              variant="contained"
              color="primary"
              fullWidth
              disabled={lists === null || paymentPending}
              width="100%"
              onClick={triggerPayment}
              style={
                paymentPending
                  ? { backgroundColor: '#ffd495', color: 'black', fontWeight: 700 }
                  : {}
              }>
              {paymentPending ? t('payment:invoice:redirect') : t('payment:invoice:pay')}
            </ButtonGlobal>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default BankList;
