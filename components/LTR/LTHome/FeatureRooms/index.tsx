import FeatureRoomCard from '@/components/Cards/FeatureRoomCard';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getCollectionLongTerm } from '@/store/Context/LTR/HomepageCollectionContext';

interface IProps { }

const FeatureRooms: FC<IProps> = () => {
    const { width } = useContext(GlobalContext);
    const { t } = useTranslation();
    const [roomFeature, setRoomFeature] = useState([]);

    useEffect(() => {
        getCollectionLongTerm('apartment_for_rent').then((res) => {
            setRoomFeature(res.data)
        });
    }, []);
    const renderFeatureRooms = (room) => (
        <div>
            <FeatureRoomCard room={room} />
        </div>
    );
    return (
        <div>
            <PropertyListHorizontalScroll
                itemWidth={width == 'xs' ? '95%' : width == 'sm' ? '30%' : width == 'md' ? '38%' : width == 'lg' ? '33%' : '30%'}
                headTitle={t('home:topDestinations')}
                listData={roomFeature}
                gutter={6}
                itemRender={renderFeatureRooms}
            />
        </div>
    )
}

export default FeatureRooms;

