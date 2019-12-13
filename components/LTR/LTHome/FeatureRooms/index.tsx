import FeatureRoomCard from '@/components/Cards/FeatureRoomCard';
import HorizontalScrollLayout from '@/pages/homepage/HorizontalScrollLayout';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { getCollectionLongTerm } from '@/store/Context/LTR/HomepageCollectionContext';
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

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
        <FeatureRoomCard room={room} />
    );
    return (
        <HorizontalScrollLayout
            headTitle={t('home:topDestinations')}
            listData={roomFeature}
            slidePerView={2.1}
            spaceBetween={10}
            paddingLeft={18}
            itemRender={renderFeatureRooms}
        />
    )
}

export default FeatureRooms;

