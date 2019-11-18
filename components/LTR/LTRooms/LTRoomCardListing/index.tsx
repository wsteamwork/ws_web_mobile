import FavoriteAnimation from '@/components/Rooms/Lotte/FavoriteAnimation';
import { LTRoomIndexRes } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { formatMoney } from '@/utils/mixins';
import { IMAGE_STORAGE_SM } from '@/utils/store/global';
import { Grid, Paper, Theme, Tooltip, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';

interface IProps {
  classes?: any,
  room?: LTRoomIndexRes,
  usingInMap?: boolean;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({})
);

const LTRoomCardListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { room, usingInMap } = props;
  const { t } = useTranslation();

  const imgRoom = room.avatar.images && room.avatar.images.length ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}` : "./static/images/westay-avatar.jpg";
  const price = room.price_display ? `${formatMoney(room.price_display)} ${t('rooms:currency')}/${t('rooms:month')}` : `${t('rooms:contactForPrice')}}`;
  // const price = room.price_display ? `${(room.price_display / 1000000)} ${t('rooms:currency')}/${t('rooms:month')}` : `${t('rooms:contactForPrice')}}`;

  return (
    <Paper elevation={0} className='ltRoomCardListing'>
      <Grid container className='roomCardListing__wrapper'>
        <Grid item xs={12} className='boxImg'>
          <LazyLoad>
            <img src={imgRoom} className={usingInMap ? 'imgSizeInMap' : 'imgSize'} alt={room.about_room.name} />
          </LazyLoad>
        </Grid>
        <Grid item xs={12} className='boxCard'>
          <Grid className='cardWrapper'>
            <Grid container className='cardContainer'>
              <Link href={`/long-term-room/${room.id}`} target="_blank" className="boxLink">
                <Grid className='boxTitle'>
                  <Grid>
                    <Typography variant='subtitle2' className='roomName'>
                      {room.instant_book ? (
                        <Tooltip
                          classes={{ tooltip: 'tooltip' }}
                          title={room.instant_book_txt}
                          placement='top'>
                          <QuickBookIcon className='svgQuick' />
                        </Tooltip>
                      ) : ''}
                      {room.about_room.name}
                    </Typography>
                  </Grid>
                  <Grid className='roomSubtitle'>
                    <span className='roomType'>{room.accommodation_type_txt}</span>
                    <span className='dotAmenties'>.</span>&nbsp;
                    <span className='address'>
                      {room.district}
                    </span>
                  </Grid>
                  <Grid className='collectionAmenities'>
                    {room.bedrooms.number_bedroom} {t('rooms:rooms')}
                    <span className='dotAmenties'>.</span>
                    {room.bathrooms.number_bathroom} {t('rooms:bathrooms')}
                    <span className='dotAmenties'>.</span>
                    {room.total_area && room.total_area > 0 ? (
                      <span>{room.total_area ? room.total_area : '?'} m<sup>2</sup></span>
                    ) : ''
                    }
                  </Grid>
                  <Grid className='boxPrice'>
                    <Typography variant='subtitle1' className='priceBasic'>
                      {price}
                    </Typography>
                  </Grid>
                  <Grid className='boxSave'>
                    <FavoriteAnimation />
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LTRoomCardListing;
