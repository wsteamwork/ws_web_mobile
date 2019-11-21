import { ICardIntro } from '@/types/Interfaces/Components/Card';
import { cleanAccents } from '@/utils/mixins';
import { makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import Cookies from 'universal-cookie';

interface IProps extends ICardIntro {
  classes?: any;
  //   showPrice?: boolean;
  recommendedPrice?: string;
  subTitle?: string;
  subTitleContent?: string;
  onClickCard?: () => void;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) => createStyles({}));

const CardItem: FunctionComponent<IProps> = (props) => {
  const classes = useStyles(props);
  const cookies = new Cookies();
  const {
    customClasses,
    imgHeight,
    imgAlt,
    imgSrc,
    title,
    // showPrice,
    // showSubTitle,
    recommendedPrice,
    subTitle,
    // showContent,
    // titleContent,
    subTitleContent,
    onClickCard
  } = props;

  const { t } = useTranslation();

  return (
    <Grid className="card-item">
      <Grid className="card-item__image-container">
        <img className="card-item__image" src={imgSrc} />
      </Grid>
      <Grid className="card-item__box-shadow"></Grid>
      {/* {title} */}
      <Grid className="card-item__box-title">
        <Grid className="card-item__title">
          {cookies.get('initLanguage') == 'en' ? cleanAccents(title) : title}
        </Grid>
        <hr className="card-item__hr"/>
        <Grid className="card-item__sub-title">
          {cookies.get('initLanguage') == 'en' ? cleanAccents(subTitle) : subTitle}
          {recommendedPrice}/{t('home:night')}
        </Grid>
      </Grid>
    </Grid>
  );
};

CardItem.defaultProps = {};

export default CardItem;
