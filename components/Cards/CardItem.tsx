import { ICardIntro } from '@/types/Interfaces/Components/Card';
import { cleanAccents } from '@/utils/mixins';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

interface IProps extends ICardIntro {
  classes?: any;
  //   showPrice?: boolean;
  recommendedPrice?: string | number;
  subTitle?: string;
  subTitleContent?: string;
  onClickCard?: () => void;
  centerTitle?: boolean;
  bigTitle?: boolean;
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
    recommendedPrice,
    subTitle,
    subTitleContent,
    onClickCard,
    centerTitle,
    bigTitle
  } = props;

  const { t } = useTranslation();

  return (
    <Grid className="card-item">
      <Grid className="card-item__image-container">
        <img className="card-item__image" src={imgSrc} />
      </Grid>
      <Grid className="card-item__box-shadow"></Grid>
      <Grid className="card-item__box-title">
        <Grid
          className={classNames(
            centerTitle ? 'text-center' : '',
            'card-item__title',
            bigTitle ? 'card-item__big-title' : ''
          )}>
          {cookies.get('initLanguage') == 'en' ? cleanAccents(title) : title}
        </Grid>
        {!centerTitle && <hr className="text-center card-item__hr" />}

        <Grid
          className={classNames(
            centerTitle ? 'text-center' : '',
            'card-item__sub-title',
            bigTitle ? 'card-item__big-sub-title' : ''
          )}>
          {subTitle ? (cookies.get('initLanguage') == 'en' ? cleanAccents(subTitle) : subTitle) : ''}
          {recommendedPrice}/{t('home:night')}
        </Grid>
      </Grid>
    </Grid>
  );
};

CardItem.defaultProps = {};

export default CardItem;
