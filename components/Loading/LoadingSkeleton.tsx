import React, { FC, Fragment } from 'react';
import ContentLoader from 'react-content-loader';

interface IProps {
  type?: string;
  duplicate?: number;
}

const Rooms = (props) => {
  let height, width;
  switch (props.screen) {
    case 'mobile': {
      height = '100';
      width = '400';
      break;
    }
    case 'desktop': {
      height = '300';
      width = '1060';
      break;
    }
    case 'large-screen': {
      height = '150';
      width = '1920';
      break;
    }
    default: {
      height = '100';
      width = '1060';
      break;
    }
  }
  return (
    <ContentLoader
      height={height}
      width={width}
      speed={1}
      primaryColor="#efefef"
      secondaryColor="#dad9d9"
      {...props}>
      {props.imageType === 'circle' ? (
        <circle cx="60" cy="45" r="30" />
      ) : (
          <rect x="5" y="0" rx="5" ry="5" width="340" height="232" />
        )}

      <rect x="370" y="0" rx="5" ry="5" width="670" height="40" />
      <rect x="370" y="55" rx="5" ry="5" width="600" height="30" />
      <rect x="370" y="100" rx="5" ry="5" width="400" height="30" />
    </ContentLoader>
  );
};

const SideBar = (props) => {
  let height, width;
  switch (props.screen) {
    case 'mobile': {
      height = '100';
      width = '400';
      break;
    }
    case 'desktop': {
      height = '620';
      width = '300';
      break;
    }
    case 'large-screen': {
      height = '150';
      width = '1920';
      break;
    }
    default: {
      height = '100';
      width = '1060';
      break;
    }
  }
  return (
    <ContentLoader
      height={height}
      width={width}
      speed={1}
      primaryColor="#efefef"
      secondaryColor="#dad9d9"
      {...props}>
      <rect x="20" y="0" rx="5" ry="5" width="260" height="110" />
      <rect x="20" y="178" rx="5" ry="5" width="260" height="85" />
      <rect x="20" y="280" rx="5" ry="5" width="260" height="85" />
      <rect x="17" y="380" rx="5" ry="5" width="260" height="85" />
      <rect x="20" y="130" rx="5" ry="5" width="201" height="30" />
    </ContentLoader>
  );
};

const RenderTypeLoading = (props) => {
  switch (props.type) {
    case 'rooms': {
      return <Rooms screen="desktop" key={props.i} />;
    }
    case 'sideBar': {
      return <SideBar screen="desktop" />;
    }
    default: {
      return null;
    }
  }
};

const LoadingSkeleton: FC<IProps> = (props) => {
  return (
    <Fragment>
      {props.duplicate ? (
        <div>
          {Array(props.duplicate)
            .fill('')
            .map((e, i) => (
              <RenderTypeLoading type={props.type} key={i} />
            ))}
        </div>
      ) : (
          <RenderTypeLoading type={props.type} />
        )}
    </Fragment>
  );
};

export default LoadingSkeleton;
