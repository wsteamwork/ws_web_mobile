import CardItem from '@/components/Cards/CardItem';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { formatPrice } from '@/utils/mixins';
import { Dispatch, FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface IProps { }

const TopDestination: FC<IProps> = () => {
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const { width } = useContext(GlobalContext);
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const { t } = useTranslation();

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

  const locationRoom = (city: any) => {
    updateRouter(`${leaseTypeGlobal} ? '/long-term-rooms' : '/rooms'`, true, 'city_id', city.city_id);
    dispatch({
      type: 'SET_SEARCH_TEXT',
      searchText: city.name_city
    });
  };

  return (
    <PropertyListHorizontalScroll
      itemWidth={
        width == 'xs'
          ? '69%'
          : width == 'sm'
            ? '40%'
            : width == 'md'
              ? '40%'
              : width == 'lg'
                ? '40%'
                : '30%'
      }
      gutter={6}
      headTitle={t('home:topDestinations')}
      listData={roomsCity}
      itemRender={renderDestinations}
    />
  );
};

export default TopDestination;
