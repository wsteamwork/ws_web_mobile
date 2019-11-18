import React, { FC, Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const ContentPlaceHolder: FC = (props) => {
  return (
    <Fragment>
      <ContentLoader
        height={440}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#e0e2fe"
        {...props}>
        <rect x="3" y="7" rx="4" ry="4" width="450" height="10" />
        <rect x="3" y="28" rx="3" ry="3" width="85" height="10" />
        <rect x="3" y="50" rx="3" ry="3" width="270" height="10" />
        <rect x="3.72" y="76" rx="3" ry="3" width="380" height="10" />
        <rect x="3" y="95" rx="3" ry="3" width="201" height="10" />
      </ContentLoader>
    </Fragment>
  );
};

export default ContentPlaceHolder;
