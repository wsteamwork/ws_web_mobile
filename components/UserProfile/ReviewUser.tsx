import { RoomReviewIndexResponse } from '@/types/Requests/Rooms/RoomReviewIndexResponse';
import { Avatar, Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  review: RoomReviewIndexResponse[];
}

const ReviewUser: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation();
  const { review } = props;
  const [limit, setLimit] = useState(5);

  const onLoadMore = () => {
    setLimit((limit) => limit + 5);
  };

  const renderListComment = review.slice(0, limit).map((todo, index) => {
    return (
      <Grid container className="itemComment" key={index}>
        <Grid item container xs={12}>
          <Grid item xs={3} sm={2}>
            <Avatar
              alt="Avatar"
              src={todo.user.data.avatar !== '' ? todo.user.data.avatar_url : ''}
              className={'avatar'}
            />
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography variant="h6" className={'nameUser'}>
              {!Array.isArray(todo.user.data) ? todo.user.data.name : t('user:incognito')}

              <span className={'starRatings'}>
                <Rating value={todo.avg_rating} size="small" readOnly />
              </span>
            </Typography>

            <Typography variant={'caption'}>
              {moment(todo.created_at).format('DD/MM/YYYY')}
            </Typography>
            <Typography className={'comments'}>{todo.comment}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <Grid className="reviewUser">
      {!!review && renderListComment}
      {limit < review.length && (
        <Grid className={'seeMore'}>
          <p onClick={onLoadMore}>{t('user:seeMore')}</p>
        </Grid>
      )}
    </Grid>
  );
};

export default ReviewUser;
