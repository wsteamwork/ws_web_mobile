import React, { FC } from 'react';
import CreateOriginalListing from '@/components/Layout/CreateOriginalListing';
import CreateOriginalHouse from '@/components/LTR/Merchant/Listing/CreateListing/OriginalListing/CreateOriginalHouse';

interface IProps {
  classes?: any
}

const house: FC<IProps> = (props) => {
  const { } = props;

  return (
    <CreateOriginalListing>
      <CreateOriginalHouse />
    </CreateOriginalListing>
  );
};

export default house;
