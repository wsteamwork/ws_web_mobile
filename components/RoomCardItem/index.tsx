import { Grid, Paper, Theme, Tooltip, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import QuickBookIcon from '@material-ui/icons/OfflineBoltRounded';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import FavoriteAnimation from '../Rooms/Lotte/FavoriteAnimation';
import LoadingSkeleton from '../Loading/LoadingSkeleton';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const imgRoom = './static/images/image-test.jpg';
  const price = '19.000.000 VNĐ/tháng';
  return (
    <Grid container item xs={12} className={classes.boxWrapper}>
      <Grid item xs={11}>
        <Paper elevation={0} className="RoomCardMobile">
          <Grid container className="__wrapper">
            <Grid item xs={12} className="boxImg">
              <LazyLoad>
                <img src={imgRoom} className="imgSize" />
              </LazyLoad>
            </Grid>
            <Grid item xs={12} className="boxCard">
              <Grid className="cardWrapper">
                <Grid container className="cardContainer">
                  <Link href={`/long-term-room/3762`} target="_blank" className="boxLink">
                    <Grid className="boxTitle">
                      <Grid>
                        <Typography variant="subtitle2" className="roomName">
                          <Tooltip
                            classes={{ tooltip: 'tooltip' }}
                            title="Đặt phòng nhanh"
                            placement="top">
                            <QuickBookIcon className="svgQuick" />
                          </Tooltip>
                          Spring Truc Bach HomeStay
                        </Typography>
                      </Grid>
                      <Grid className="roomSubtitle">
                        <span className="roomType">Biệt thự</span>
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">Hoàn Kiếm</span>&nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">Hà Nội</span>
                      </Grid>
                      <Grid className="collectionAmenities">
                        <span className="address">3 phòng ngủ</span>&nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">2 phòng tắm</span>&nbsp;
                        <span className="dotAmenties">.</span>&nbsp;
                        <span className="address">
                          44 m<sup>2</sup>
                        </span>
                      </Grid>
                      <Grid className="boxPrice">
                        <Typography variant="subtitle1" className="priceBasic">
                          {price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="boxSave">
              <Grid className="boxFavorite">
                <FavoriteAnimation />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoomCardItem;
