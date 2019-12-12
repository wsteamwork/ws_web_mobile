import { getRoomType } from '@/components/Rooms/FilterActions/RoomType/context';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Grid, Typography } from '@material-ui/core';
import { FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { updateRouter } from '@/store/Context/utility';
interface IProps {}
const RoomTypeList: FC<IProps> = () => {
  const { width } = useContext(GlobalContext);
  const [roomTypesData, setRoomTypesData] = useState<any[]>([]);
  const propertyImgs = ['house', 'apartment', 'villa', 'room', 'hotels', 'studio'];
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>(
    (state) => state.searchFilter.leaseTypeGlobal
  );
  const renderRoomTypeItem = (item, size) => (
    <Grid onClick={() => redirectByProperty(item.id)}>
      <Grid className="propery-item-icon">
        <img className="item-icon" style={{ width: size, height: size }} src={item.img}></img>
      </Grid>
      <Typography style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: 4 }}>
        {item.value}
      </Typography>
    </Grid>
  );

  const redirectByProperty = (type: any) => {
    updateRouter(leaseTypeGlobal ? '/long-term-rooms' : '/rooms', true, 'accommodation_type', type);
  };

  useEffect(() => {
    getRoomType()
      .then((res) => {
        // console.log(res);
        return res.map((item, index) => ({
          ...item,
          img: `/static/images/property/${propertyImgs[index]}.jpg`
        }));
      })
      .then((list) => setRoomTypesData(list));
  }, []);

  return (
    <PropertyListHorizontalScroll
      itemWidth={width == 'xs' ? '28%' : width == 'sm' ? '22%' : width == 'md' ? '16.67%' : '20%'}
      gutter={6}
      listData={roomTypesData}
      itemRender={renderRoomTypeItem}
      sizeIcon={width == 'sm' ? 100 : 65}
    />
  );
};
export default RoomTypeList;
