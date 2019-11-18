import React, { Fragment, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import GridContainer from '../Layout/Grid/Container';
import CardPromotion from './CardPromotion';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { useTranslation } from 'react-i18next';
import { PromotionRes } from '@/types/Requests/Promotion/PromotionResponse';

const PromotionsComponent = () => {
  const promotions = useSelector<ReducersList, PromotionRes[]>(
    (state) => state.promotion.promotions
  );
  const { t } = useTranslation();

  return (
    <Fragment>
      <Grid className="promotionsBackground">
        <Grid className="description">
          <p className="title">{t('promotion:allPromotion')}</p>
          <p className="label">{t('promotion:fell')}</p>
        </Grid>
      </Grid>

      {useMemo(
        () => (
          <GridContainer xs={11} md={8}>
            <Grid container spacing={4}>
              {promotions.map((item, index) => (
                <Grid key={index} item xs={12} lg={4}>
                  <CardPromotion promotion={item}></CardPromotion>
                </Grid>
              ))}
            </Grid>
          </GridContainer>
        ),
        [promotions]
      )}
    </Fragment>
  );
};

export default PromotionsComponent;
