

import { getRoomType } from '@/components/Rooms/FilterActions/RoomType/context';
import PropertyListHorizontalScroll from '@/pages/homepage/PropertyListHorizontalScroll';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Grid, Typography } from '@material-ui/core';
import { FC, useContext, useEffect, useState } from 'react';
interface IProps { }
const RoomTypeList: FC<IProps> = () => {
    const { width } = useContext(GlobalContext);
    const [roomTypesData, setRoomTypesData] = useState<any[]>([]);
    const propertyImgs = ['house', 'apartment', 'villa', 'room', 'hotels'];
    const renderRoomTypeItem = (item, size) => (
        <Grid>
            <Grid className="propery-item-icon">
                <img className="item-icon" style={{ width: size, height: size }} src={item.img}></img>
            </Grid>
            <Typography style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: 4 }}>{item.value}</Typography>
        </Grid>
    );

    useEffect(() => {
        getRoomType()
            .then((res) =>
                res.map((item, index) => ({
                    ...item,
                    img: `/static/images/property/${propertyImgs[index]}.jpg`
                }))
            )
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
    )
}
export default RoomTypeList;