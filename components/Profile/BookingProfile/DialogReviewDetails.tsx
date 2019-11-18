import { TransitionCustom } from '@/components/Book/BookingForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { RoomReviewInfoRes, RoomShowReviewRes } from '@/types/Requests/ReviewRoom/ReviewResponse';
import { axios } from '@/utils/axiosInstance';
import { formatMoney } from '@/utils/mixins';
import { Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IDialogReviewDetails {
  stateOpen: number;
  setStateOpen: Dispatch<SetStateAction<number>>;
  id_review: number;
  room_id: number;
}

const DialogReviewDetails: FC<IDialogReviewDetails> = (props) => {
  const { t } = useTranslation();
  const { stateOpen, id_review, room_id } = props;
  const { width } = useContext(GlobalContext);
  const [roomReview, setRoomReview] = useState<RoomShowReviewRes | null>(null);
  const [room, setRoom] = useState<RoomReviewInfoRes | null>(null);

  const handleClick = (id: number) => {
    props.setStateOpen(id);
  };

  useEffect(() => {
    if (stateOpen === id_review) {
      axios
        .get(`reviews/show-reviews/${props.id_review}`)
        .then((res: AxiosRes<RoomShowReviewRes>) => {
          setRoomReview(res.data.data);
        })
        .catch((err) => { });

      axios
        .get(`get-room-for-review/${props.room_id}`)
        .then((res2: AxiosRes<RoomReviewInfoRes>) => {
          setRoom(res2.data.data);
        })
        .catch((err) => { });
    }
  }, [stateOpen]);

  return (
    room && (
      <Dialog
        key={id_review}
        TransitionComponent={TransitionCustom}
        keepMounted
        scroll="body"
        fullScreen={width === 'xs' || width === 'sm'}
        maxWidth="md"
        open={stateOpen === id_review}
        onClose={() => handleClick(0)}>
        <Grid className="dialogReviewDetails">
          <DialogTitle classes={{ root: 'dialogTitle' }}>
            <IconButton aria-label="Close" onClick={() => handleClick(0)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent classes={{ root: 'dialogContent' }}>
            {!!roomReview ? (
              <Grid container spacing={3} justify="center" alignContent="center">
                <Grid item xs={12} sm={12} md={4}>
                  <Card className={'card'} elevation={0}>
                    <CardActionArea>
                      <CardMedia
                        className={'media'}
                        image={`https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/${room.image}`}
                        title={t('profile:bookingProfile:photoRoom')}
                      />
                      <CardContent className={'cardContent'}>
                        <Typography component="p" className={'nameCity'}>
                          {room.room_type_text}
                        </Typography>
                        <Typography variant="h5" component="h2" className={'nameRoom'}>
                          {room.name}
                        </Typography>
                        <Typography component="p" className={'priceRoom'}>
                          {`${formatMoney(room.price_day, 0)}`}đ{' '}
                          <sub>/{t('profile:bookingProfile:day')}</sub> -
                          {`${formatMoney(room.price_hour, 0)}`}đ{' '}
                          <sub>/4 {t('profile:bookingProfile:hours')}</sub>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item xs={12} sm={12} md={7}>
                  <Typography variant="h6">{t('profile:bookingProfile:commentRoom')}</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label={t('profile:bookingProfile:feedback')}
                    multiline
                    disabled
                    rows="6"
                    rowsMax="6"
                    fullWidth
                    defaultValue={roomReview!.comment}
                    className={'textField'}
                    margin="normal"
                    variant="outlined"
                  />
                  <Grid container>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" component="h2" className={'title'}>
                        {t('profile:bookingProfile:clean')}
                      </Typography>

                      <Rating value={roomReview.cleanliness} size="small" color="#46AFCC"></Rating>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" component="h2" className={'title'}>
                        {t('profile:bookingProfile:roomQuality')}
                      </Typography>

                      <Rating value={roomReview.quality} size="small" color="#46AFCC"></Rating>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" className={'title'}>
                        {t('profile:bookingProfile:roomService')}
                      </Typography>

                      <Rating value={roomReview.service} size="small" color="#46AFCC"></Rating>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" className={'title'}>
                        {t('profile:bookingProfile:value')}
                      </Typography>

                      <Rating value={roomReview.valuable} size="small" color="#46AFCC"></Rating>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" className={'title'}>
                        {t('profile:bookingProfile:roomOverview')}
                      </Typography>

                      <Rating value={roomReview.avg_rating} size="small" color="#46AFCC"></Rating>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12}>
                      <Typography variant="h5" className={'title'}>
                        {t('profile:bookingProfile:likeRoom')}
                      </Typography>
                      <div>
                        <FormControl>
                          <RadioGroup
                            name="like"
                            value={roomReview!.like.toString()}
                            classes={{
                              root: 'radio'
                            }}>
                            <FormControlLabel
                              value="1"
                              control={
                                <Radio checkedIcon={<SentimentVerySatisfied color="error" />} />
                              }
                              label={t('profile:bookingProfile:satisfied')}
                            />
                            <FormControlLabel
                              value="0"
                              control={
                                <Radio checkedIcon={<SentimentVeryDissatisfied color="error" />} />
                              }
                              label={t('profile:bookingProfile:unsatisfied')}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
                <SimpleLoader />
              )}
          </DialogContent>
        </Grid>
      </Dialog>
    )
  );
};

export default DialogReviewDetails;
