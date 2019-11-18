import { GlobalContext } from '@/store/Context/GlobalContext';
import { Grid, Hidden } from '@material-ui/core';
import React, { FC, memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonGlobal from '../ButtonGlobal';

const HostBecome: FC = () => {
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();

  // const desc = useMemo(() => {
  //   const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia accusamus dolore
  //   ea ullam explicabo, placeat nostrum aliquam magnam sit accusantium, dolorum odio cum
  //   officiis? Dolorem illo error repellendus necessitatibus itaque?`;
  //
  //   if (width === 'sm') {
  //     return `${text.substr(0, 100)}...`;
  //   } else if (width === 'xs') {
  //     return `${text.substr(0, 50)}...`;
  //   }
  //
  //   return text;
  // }, [width]);

  return (
    <Grid container justify='center' className="hostBecome">
      <Grid container item xs={11} sm={12} md={11} lg={10} direction={width === 'xs' ? 'column-reverse' : 'row'}>
        <Grid item xs sm={8}>
          <h3 className="title">{t('home:becomeAHost')}</h3>
          <Grid>
            <p className="desc">{t('home:hostAttraction')}
            </p>
          </Grid>

          <Grid className="hostBecome__button">
            <ButtonGlobal
              href="https://merchant.westay.vn/"
              padding="0px 30px"
              background="#000"
              className="hostBecome__buttonGlobal">
              {t('home:becomeAHost')}
            </ButtonGlobal>
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Grid item xs sm={4} container justify={width === 'xs' ? 'center' : 'flex-end'} alignItems='center'>
            <img
              className="hostBecome__image"
              src="./static/images/cta-img2.png"
              alt={t('home:becomeAHost')}
            />
          </Grid>
        </Hidden>
      </Grid>

      {/* <Grid
        item
        xs
        sm={4}
        container
        justify={width === 'xs' ? 'center' : 'flex-end'}
        alignItems="center">
        <img
          className="hostBecome__image"
          src="./static/images/cta-img2.png"
          alt={t('home:beComeAHost')}
        />
      </Grid> */}
    </Grid>
  );
};

// @ts-ignore
export default memo(HostBecome);
