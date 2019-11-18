import React, { FC, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import ButtonGlobal from '../ButtonGlobal';
import { PromotionRes } from '@/types/Requests/Promotion/PromotionResponse';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IProps {
  promotion: PromotionRes;
}

const CardPromotion: FC<IProps> = (props) => {
  const { promotion } = props;
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="cardPromotion">
        <img src={`${IMAGE_STORAGE_LG}${promotion.image}`} alt="" />

        <Grid container spacing={2} className="descriptionCard">
          <Grid item xs={12}>
            <p className="name">{promotion.name}</p>
          </Grid>

          <Grid className="time" container item xs={12} spacing={1}>
            <Grid container xs={12} item justify="space-between">
              <p>{t('promotion:startDate')}</p>
              <p>{promotion.date_start}</p>
            </Grid>
            <Grid container xs={12} item justify="space-between">
              <p>{t('promotion:endDate')}</p>
              <p>{promotion.date_end}</p>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Link href={`/promotion/${promotion.id}`}>
              <a>
                <ButtonGlobal padding="0px" width="100%">
                  {t('promotion:seeDetails')}
                </ButtonGlobal>
              </a>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default CardPromotion;
