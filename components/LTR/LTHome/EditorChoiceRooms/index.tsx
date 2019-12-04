import React, { FC, useState, useEffect, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { getHomePageCollection } from '@/store/Hooks/CardRoomHooks';
import { GlobalContext } from '@/store/Context/GlobalContext';
import ShowMoreHome from '../ShowMoreHome';
import EditorChoiceCard from './EditorChoiceCard';

interface IProps {
  classes?: any;
}
const EditorChoiceRooms: FC<IProps> = (props) => {
  const [dataRooms, setDataRooms] = useState<any[]>([]);
  const { t } = useTranslation();
  const { width } = useContext(GlobalContext);
  useEffect(() => {
    getHomePageCollection('editor_choice').then((res) => setDataRooms(res));
  }, []);
  const renderEditorChoiceRoom = (room) => <EditorChoiceCard room={room}/>;
  return (
    <Fragment>
      <PropertyListHorizontalScroll
        itemWidth={width == 'sm' ? '33.3%' : '66.7%'}
        gutter={6}
        headTitle={t('home:editor_choice')}
        listData={dataRooms}
        itemRender={renderEditorChoiceRoom}
      />
      <ShowMoreHome />
    </Fragment>
  );
};

export default EditorChoiceRooms;
