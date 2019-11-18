import React, { FC } from 'react';
import CustomPopper from '@/components/CustomPopper';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import mainColor from '@/styles/constants/colors';
import { useTranslation } from 'react-i18next';

const TooltipPayment: FC = () => {
  const { t } = useTranslation();

  return (
    <CustomPopper
      arrow
      placement="top"
      content={
        <Grid className="detailsFeeService">
          <p>{t('payment:invoice:paymentDirect')}</p>
        </Grid>
      }>
      <span>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          size="1x"
          color={mainColor.primary}></FontAwesomeIcon>
      </span>
    </CustomPopper>
  );
};

export default TooltipPayment;
