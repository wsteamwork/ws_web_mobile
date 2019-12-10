import { GlobalContext } from '@/store/Context/GlobalContext';
import { cleanAccents } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid, Link, Theme, Typography } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { createStyles, makeStyles } from '@material-ui/styles';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
interface IProps {
  classes?: any;
  city: string;
  district: string;
  roomID: number;
  roomName: string;
  roomImage: string;
  roomType: string;
  avg_rating?: number;
  priceDisplay?: number;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    txtName: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: '34px',
      letterSpacing: 0.36,
      color: '#252529',
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      display: '-webkit-box'
    },
    txtPrice: {
      fontSize: 22,
      lineHeight: '28px',
      textAlign: 'right',
      letterSpacing: 0.32,
      fontWeight: 'bold',
      color: '#252529'
    },
    txtAddress: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#252529'
    },
    txtPer: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13,
      lineHeight: '1.1',
      // letterSpacing: -0.08,
      color: '#252529'
      // textAlign: 'center'
    },
    rowMarginTop: {
      marginTop: '8px'
    },
    iconEmpty: {
      color: '#51ccbb'
    },
    colorStar: {
      color: '#54D3C2',
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '1.3rem'
      }
    },
    txtReview: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 11,
      lineHeight: '13px',
      letterSpacing: 0.07,
      color: '#FFFFFF',
      marginLeft: 8
    }
  })
);

const CardRoom2: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { roomID, roomName, city, district, roomImage, roomType, avg_rating, priceDisplay } = props;
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  const cookies = new Cookies();

  return (
    <Grid className="roomCard2">
      <Grid container className="roomCard2__wrapper" spacing={0}>
        <Grid item xs={5} className="boxImg">
          <img
            src={!!roomImage ? IMAGE_STORAGE_SM + roomImage : './static/images/westay-avatar.jpg'}
            className="imgSize swiper-lazy"
            alt={``}
          />
        </Grid>
        <Grid item xs={7} className="boxCard">
          <Grid className="boxCard__cardWrapper">
            <Grid container className="cardContainer">
              <Link href={`/long-term-room/${roomID}`} target="_blank" className="boxLink">
                <Grid className="boxTitle">
                  <Grid>
                    <Typography variant="subtitle2" className="roomName">
                      {roomName}
                    </Typography>
                  </Grid>
                  <Grid className="roomSubtitle">
                    {cookies.get('initLanguage') == 'en' ? cleanAccents(district) : district},{' '}
                    {cookies.get('initLanguage') == 'en' ? cleanAccents(city) : city}
                  </Grid>
                </Grid>
                <Grid className="boxRating">
                  <Rating
                    name="customized-empty"
                    readOnly
                    size="small"
                    value={4}
                    precision={0.5}
                    classes={{ root: classes.colorStar }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.iconEmpty} />}
                  />
                </Grid>

                <Grid className="boxPrice">
                  <Grid className="priceContainer">
                    <Typography variant="subtitle1" className="priceText">
                      {width == 'xs' && cookies.get('initLanguage') == 'en' ? '$' : ''}
                      {priceDisplay}
                      {width == 'xs' && cookies.get('initLanguage') == 'vn' ? 'đ' : ''}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.txtPer}>
                      {width == 'xs'
                        ? '/' + t('home:month')
                        : cookies.get('initLanguage') == 'en'
                        ? 'usd/' + t('home:month')
                        : 'đ/' + t('home:month')}
                    </Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardRoom2;
