import { IS_SEARCH_CITY, IS_SEARCH_DISTRICT } from '@/types/Requests/Search/SearchResponse';
import { Grid, ListItem } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

// type CheckType = CityEntity | DistrictEntity | RoomEntity;

interface IProps {
  item: any;
  suggestionSelected(value: string): void;
}

const ItemSeach: FC<IProps> = (props) => {
  const { item, suggestionSelected } = props;
  const { t } = useTranslation();

  return (
    <ListItem onClick={() => suggestionSelected(item.name)} className="itemSearchResponse">
      <Grid container>
        <Grid item xs={7} className="left">
          <p className="name">{item.name}</p>
        </Grid>
        <Grid item xs={5} className="right">
          <span className="citySearchResponse">
            {item.type === IS_SEARCH_CITY
              ? t('home:SearchAutocomplete:city')
              : item.type === IS_SEARCH_DISTRICT
                ? t('home:SearchAutocomplete:district')
                : t('home:SearchAutocomplete:room')}
          </span>
        </Grid>
      </Grid>

      <Grid container className="desc">
        <Grid item className="right">
          {item.number_room !== 0 && item.number_room! && (
            <p>
              {item.number_room} {t('home:SearchAutocomplete:accommodation')}
            </p>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ItemSeach;
