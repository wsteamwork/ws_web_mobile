import CardItem from "@/components/Cards/CardItem";
import PropertyListHorizontalScroll from "@/pages/homepage/PropertyListHorizontalScroll";
import { GlobalContext } from "@/store/Context/GlobalContext";
import { updateRouter } from "@/store/Context/utility";
import { ReducersList } from "@/store/Redux/Reducers";
import { SearchFilterAction } from "@/store/Redux/Reducers/Search/searchFilter";
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { formatPrice } from '@/utils/mixins';
import { Dispatch, FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

interface IProps { };

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
                onClickCard={() => locationRoom(city.name_city)}
            />
        </div>
    );

    const locationRoom = (nameCity: string) => {
        updateRouter(`${leaseTypeGlobal} ? '/long-term-rooms' : '/rooms'`, true, 'name', nameCity);
        dispatch({
            type: 'SET_SEARCH_TEXT',
            searchText: nameCity
        });
    };

    return (
        <PropertyListHorizontalScroll
            itemWidth={width == 'xs' ? '50%' : width == 'sm' ? '30%' : width == 'md' ? '38%' : width == 'lg' ? '33%' : '30%'}
            gutter={6}
            headTitle={t('home:topDestinations')}
            listData={roomsCity}
            itemRender={renderDestinations}
        />
    )
}

export default TopDestination;