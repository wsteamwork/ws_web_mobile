import React, { Fragment, useRef, useState } from 'react';
import GridContainer from '../Layout/Grid/Container';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PromotionRes } from '@/types/Requests/Promotion/PromotionResponse';
import { IMAGE_STORAGE_LG, DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { Grid, InputBase } from '@material-ui/core';
import numeral from 'numeral';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const PromotionComponent = () => {
  const promotion = useSelector<ReducersList, PromotionRes>((state) => state.promotion.promotion);
  const refInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    refInput.current.select();
    document.execCommand('copy');
    setOpen(true);
  };

  return (
    <Fragment>
      <GridContainer xs={12}>
        <img src={`${IMAGE_STORAGE_LG}${promotion.image}`} className="imagePromotion" alt="" />
      </GridContainer>

      <GridContainer xs={11} lg={9} classNameItem="promotionDetail">
        <Grid container className="view1" direction="column" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <p className="namePromotion">{promotion.name}</p>
          </Grid>
          <Grid item xs={12}>
            <p>
              Mã <b>{promotion.coupons.data[0].code}:</b> {t('promotion:getDeal')}{' '}
              <b>{promotion.coupons.data[0].discount}%</b>. {t('promotion:desc1')}{' '}
              <b>{numeral(promotion.coupons.data[0].settings.min_price).format('0,0')}đ</b>{' '}
            </p>
          </Grid>

          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12} md={6} className="timeStart">
              <span>
                {t('promotion:startDate')} {promotion.date_start}
              </span>
            </Grid>
            <Grid item xs={12} md={6} className="timeEnd">
              <span>
                {t('promotion:endDate')} {promotion.date_end}
              </span>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="boxCode">
              <p className="title">{t('promotion:promotionCode')}</p>
              <div className="box">
                <InputBase
                  className="input"
                  value={promotion.coupons.data[0].code}
                  inputRef={refInput}
                />
                <span className="copy" onClick={handleCopy}>
                  {!open ? t('promotion:copycode') : t('promotion:copied')}
                </span>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid className="view2" container spacing={3}>
          <Grid className="detailsPromotion" item xs={12}>
            <p>{t('promotion:cabinet')}</p>
          </Grid>

          <Grid item xs={12}>
            <p>
              {t('promotion:since')} {moment(promotion.date_start).format(DEFAULT_DATE_FORMAT)} -{' '}
              {moment(promotion.date_end).format(DEFAULT_DATE_FORMAT)}, {t('promotion:desc2')}{' '}
              <b>{promotion.coupons.data[0].code}</b> –{' '}
              <b>
                {t('promotion:sale')} {promotion.coupons.data[0].discount}%{' '}
                {t('promotion:bookingValue')}
              </b>
              , {t('promotion:maximum')}{' '}
              <b>{numeral(promotion.coupons.data[0].settings.min_price).format('0,0')}đ</b>.
              {t('promotion:desc3')}
            </p>
          </Grid>
        </Grid>

        <Grid container className="view3" spacing={2}>
          <Grid className="title" item xs={12}>
            <p>{t('promotion:detailsTerms')}</p>
          </Grid>

          {!!promotion.coupons.data[0].term_of_uses &&
            promotion.coupons.data[0].term_of_uses.map((item, index) => (
              <Grid key={index} item xs={12}>
                <p>🚀 {item}</p>
              </Grid>
            ))}
        </Grid>
      </GridContainer>
    </Fragment>
  );
};

export default PromotionComponent;
