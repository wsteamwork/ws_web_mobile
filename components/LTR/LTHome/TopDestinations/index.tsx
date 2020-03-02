import CardItem from '@/components/Cards/CardItem';
import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { formatPrice } from '@/utils/mixins';
import { Dispatch, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface IProps { }

const TopDestination: FC<IProps> = (props) => {
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const { t } = useTranslation();

  const locationRoom = (city: any) => {
    updateRouter(`${leaseTypeGlobal ? '/long-term-rooms' : '/rooms'}`, true, 'city_id', city.city_id);
    dispatch({
      type: 'SET_SEARCH_TEXT',
      searchText: city.name_city
    });
  };

  const renderDestinations = (city: NumberRoomCity) => (
    <div>
      <CardItem
        title={city.name_city}
        imgSrc={city.image}
        recommendedPrice={formatPrice(parseInt(city.average_price))}
        onClickCard={() => locationRoom(city.city_id)}
      />
    </div>
  );

  return (
    <div style={{ marginBottom: '1rem' }}>
      <HorizontalScrollLayout
        headTitle={t('home:topDestinations')}
        listData={roomsCity}
        slidePerView={2.1}
        spaceBetween={10}
        paddingLeft={18}
        itemRender={renderDestinations}
      />
    </div>
  );
};

export default TopDestination;
