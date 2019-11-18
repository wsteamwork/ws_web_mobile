import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import mainColor from '@/styles/constants/colors';
import { RoomReviewInfoReq } from '@/types/Requests/ReviewRoom/ReviewRequest';
import { RoomReviewInfoRes } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { axios } from '@/utils/axiosInstance';
import { formatMoney } from '@/utils/mixins';
import { Card, CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Snackbar, TextField, Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import ButtonGlobal from '../ButtonGlobal';
import MySnackbarContentWrapper from '../Profile/EditProfile/MySnackbarContentWrapper';

// @ts-ignore
const ReviewRoom: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating_cleanliness, setRating_cleanliness] = useState<number>(3);
  const [rating_quality, setRating_quality] = useState<number>(3);
  const [rating_service, setRating_service] = useState<number>(3);
  const [rating_valuable, setRating_valuable] = useState<number>(3);
  const [rating_avg_rating, setRating_avg_rating] = useState<number>(3);
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  const roomReview = useSelector<ReducersList, RoomReviewInfoRes>((state) => state.iProfile.review);

  const changeLike = (e: ChangeEvent<{}>, value: string) => {
    setSelectedValue(parseInt(value, 10));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data: RoomReviewInfoReq = {
      cleanliness: rating_cleanliness,
      quality: rating_quality,
      service: rating_service,
      valuable: rating_valuable,
      avg_rating: rating_avg_rating,
      booking_id: roomReview.booking_id,
      comment: comment,
      like: selectedValue,
      recommend: selectedValue
    };

    try {
      await axios.post('reviews', data);
      setLoading(false);
      setOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form>
      {roomReview ? (
        <Grid className="reviewRoom">
          <Grid className={'boxPadding'}>
            <Grid container spacing={3} justify="center" alignContent="center">
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="h6" className={'review'}>
                  {t('reviews:reivewAndCmt')}
                </Typography>
                <Card className={'card'} elevation={0}>
                  <CardActionArea>
                    <CardMedia
                      className={'media'}
                      image={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${roomReview.image}`}
                      title="Westay-Homestay cho người Việt"
                    />
                    <CardContent className={'cardContent'}>
                      <Typography component="p" className={'nameCity'}>
                        {roomReview.room_type_text}
                      </Typography>
                      <Typography variant="h5" component="h2" className={'nameRoom'}>
                        {roomReview.name}
                      </Typography>
                      <Typography component="p" className={'priceRoom'}>
                        {`${formatMoney(roomReview.price_day, 0)}`}đ <sub>/ {t('reviews:day')}</sub>{' '}
                        - {`${formatMoney(roomReview.price_hour, 0)}`}đ{' '}
                        <sub>/4 {t('reviews:night')}</sub>
                      </Typography>
                      <div>
                        <span className={'starRatings'}>
                          <Rating
                            value={roomReview.avg_avg_rating}
                            color={mainColor.primary}
                            size="small"
                            readOnly></Rating>
                        </span>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item xs={12} sm={12} md={7}>
                <Typography variant="h6">{t('reviews:cmtRoom')}</Typography>
                <TextField
                  id="outlined-multiline-static"
                  label={t('reviews:des')}
                  multiline
                  rows="6"
                  rowsMax="6"
                  fullWidth
                  defaultValue=""
                  onChange={(e) => setComment(e.target.value)}
                  className={'textField'}
                  margin="normal"
                  variant="outlined"
                />
                <Grid container>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" component="h2" className={'title'}>
                      {t('reviews:clean')}
                    </Typography>

                    {useMemo(
                      () => (
                        <StarRatings
                          rating={rating_cleanliness} //index rating
                          starDimension="20px"
                          starSpacing="1px"
                          starHoverColor={mainColor.primary}
                          starRatedColor={mainColor.primary}
                          changeRating={(rating) => setRating_cleanliness(rating)}
                        />
                      ),
                      [rating_cleanliness]
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" component="h2" className={'title'}>
                      {t('reviews:quality')}
                    </Typography>

                    {useMemo(
                      () => (
                        <StarRatings
                          rating={rating_quality} //index rating
                          starDimension="20px"
                          starSpacing="1px"
                          starHoverColor={mainColor.primary}
                          starRatedColor={mainColor.primary}
                          changeRating={(rating) => setRating_quality(rating)}
                        />
                      ),
                      [rating_quality]
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" className={'title'}>
                      {t('reviews:service')}
                    </Typography>

                    {useMemo(
                      () => (
                        <StarRatings
                          rating={rating_service} //index rating
                          starDimension="20px"
                          starSpacing="1px"
                          starHoverColor={mainColor.primary}
                          starRatedColor={mainColor.primary}
                          changeRating={(rating) => setRating_service(rating)}
                        />
                      ),
                      [rating_service]
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" className={'title'}>
                      {t('reviews:value')}
                    </Typography>

                    {useMemo(
                      () => (
                        <StarRatings
                          rating={rating_valuable} //index rating
                          starDimension="20px"
                          starSpacing="1px"
                          starHoverColor={mainColor.primary}
                          starRatedColor={mainColor.primary}
                          changeRating={(rating) => setRating_valuable(rating)}
                        />
                      ),
                      [rating_valuable]
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" className={'title'}>
                      {t('reviews:overview')}
                    </Typography>

                    {useMemo(
                      () => (
                        <StarRatings
                          rating={rating_avg_rating} //index rating
                          starDimension="20px"
                          starSpacing="1px"
                          starHoverColor={mainColor.primary}
                          starRatedColor={mainColor.primary}
                          changeRating={(rating) => setRating_avg_rating(rating)}
                        />
                      ),
                      [rating_avg_rating]
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Typography variant="h5" className={'title'}>
                      {t('reviews:nice')}
                    </Typography>
                    <div>
                      {useMemo(
                        () => (
                          <FormControl>
                            <RadioGroup
                              onChange={changeLike}
                              name="like"
                              value={selectedValue.toString()}
                              classes={{
                                root: 'radio'
                              }}>
                              <FormControlLabel
                                value="1"
                                control={
                                  <Radio checkedIcon={<SentimentVerySatisfied color="error" />} />
                                }
                                label={t('reviews:satisfied')}
                              />
                              <FormControlLabel
                                value="0"
                                control={
                                  <Radio
                                    checkedIcon={<SentimentVeryDissatisfied color="error" />}
                                  />
                                }
                                label={t('reviews:unsatisfied')}
                              />
                            </RadioGroup>
                          </FormControl>
                        ),
                        [selectedValue]
                      )}
                    </div>
                  </Grid>
                </Grid>
                {useMemo(
                  () => (
                    <ButtonGlobal variant="contained" onClick={handleSubmit}>
                      {loading ? <SimpleLoader /> : t('reviews:submit')}
                    </ButtonGlobal>
                  ),
                  [loading]
                )}
              </Grid>
            </Grid>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}>
            <MySnackbarContentWrapper
              variant="success"
              message={t('reviews:success')}
              onClose={handleClose}></MySnackbarContentWrapper>
          </Snackbar>
        </Grid>
      ) : (
          <SimpleLoader />
        )}
    </form>
  );
};

export default ReviewRoom;
