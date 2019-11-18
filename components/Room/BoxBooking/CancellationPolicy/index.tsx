import mainColor from '@/styles/constants/colors';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import Link from 'next/link';
import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const CancellationPolicy: FC = () => {
  const { t } = useTranslation();

  return useMemo(
    () => (
      <Grid className="cancellationPolicy">
        <Grid container>
          <Grid item xs={7}>
            <p>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                size="1x"
                color={mainColor.primary}></FontAwesomeIcon>{' '}
              {t('room:boxBooking:cancellationPolicy')}
            </p>
          </Grid>
          <Grid item xs={5} className="cancellationPolicy__details">
            <Link href="/terms-and-conditions">
              <a>{t('room:boxBooking:details')}</a>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    ),
    [t]
  );
};

export default memo(CancellationPolicy);
