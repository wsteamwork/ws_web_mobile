import CreateOriginalListing from '@/components/Layout/CreateOriginalListing';
import ChooseTypeAccommodation from '@/components/LTR/Merchant/Listing/CreateListing/OriginalListing/ChooseTypeAccommodation';
import React, { FC, Fragment } from 'react';

interface IProps {
  classes?: any;
}

const CreateListing: FC<IProps> = (props) => {
  // const { } = props;

  return (
    <Fragment>
      <CreateOriginalListing>
        <ChooseTypeAccommodation />
      </CreateOriginalListing>
    </Fragment>
  );
};

export default CreateListing;
