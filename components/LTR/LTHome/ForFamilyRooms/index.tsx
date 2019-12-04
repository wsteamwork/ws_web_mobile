import React, { FC, useState, useEffect, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { GlobalContext } from '@/store/Context/GlobalContext';
import ShowMoreHome from '../ShowMoreHome';
import EditorChoiceCard from '../EditorChoiceRooms/EditorChoiceCard';
interface IProps {
  classes?: any;
}

const ForFamilyRooms: FC<IProps> = (props) => {
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { width } = useContext(GlobalContext);
  const { t } = useTranslation();
  useEffect(() => {
    getHomePageCollection('for_family').then((res) => setDataRooms(res));
  }, []);
  const renderForFamilyRoom = (room) => <EditorChoiceCard room={room} showDetail={true}/>;
  return (
    <Fragment>
      <PropertyListHorizontalScroll
        itemWidth={width == 'sm' ? '33.3%' : '66.7%'}
        gutter={6}
        headTitle={t('home:for_family')}
        listData={dataRooms}
        itemRender={renderForFamilyRoom}
      />
      <ShowMoreHome top="-15px"/>
    </Fragment>
  );
};

export default ForFamilyRooms;
