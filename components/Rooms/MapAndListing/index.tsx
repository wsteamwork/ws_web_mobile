import ListingLTRooms from '@/components/LTR/LTRooms/ListingLTRooms';
import { ReducersList } from '@/store/Redux/Reducers';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import SidebarAndListing from '../SidebarAndListing';
import { useRefreshListing } from './context';
import MapRoomListing from './MapRoomListing';

const MapAndListing = () => {
  const { isMapOpen } = useRefreshListing();
  const leaseTypeGlobal = useSelector<ReducersList, 0 | 1>((state) => state.searchFilter.leaseTypeGlobal);

  return useMemo(
    () =>
      !!isMapOpen ? <MapRoomListing /> : (leaseTypeGlobal ? <ListingLTRooms /> : <SidebarAndListing />),
    [isMapOpen]
  );
};

export default MapAndListing;
