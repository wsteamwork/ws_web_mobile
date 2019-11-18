import CustomPopper from '@/components/CustomPopper';
import mainColor from '@/styles/constants/colors';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
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
          // color={mainColor.primary}
          style={{ color: '#673ab7' }}
        ></FontAwesomeIcon>
      </span>
    </CustomPopper>
  );
};

export default TooltipPayment;
