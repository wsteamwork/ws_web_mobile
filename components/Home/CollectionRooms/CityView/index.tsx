import CardIntro from '@/components/Cards/CardIntro';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';
import { Grid, Hidden, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/scss/swiper.scss';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8)
    },
    boxTitle: {
      textAlign: 'center'
    },
    title: {
      marginBottom: theme.spacing(3),
      fontWeight: 700
    },
    paddingItem: {
      padding: theme.spacing(1 / 2)
    }
  })
);

const CityView: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();

  const setting = {
    slidesPerView: 5,
    lazy: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    renderPrevButton: () => <PrevArrow className="swiper-button-prev"></PrevArrow>,
    renderNextButton: () => <NextArrow className="swiper-button-next"></NextArrow>,
    breakpoints: {
      1920: {},
      1128: {
        slidesPerView: 4
      },
      960: {
        slidesPerView: 2.3,
        freeMode: true
      },
      600: {
        slidesPerView: 1.5
      }
    }
  };

  return (
    <Grid className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {t('home:collectionRooms:cityView')}
      </Typography>
      <Hidden smDown implementation="css">
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
          <Grid item xs>
            <CardIntro imgHeight={350} />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Swiper {...setting}>
          <div className={classes.paddingItem}>
            <Link href="/room/3762">
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href="/room/3762">
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href="/room/3762">
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
          <div className={classes.paddingItem}>
            <Link href="/room/3762">
              <a>
                <CardIntro imgHeight={290} />
              </a>
            </Link>
          </div>
        </Swiper>
      </Hidden>
    </Grid>
  );
};

export default CityView;
