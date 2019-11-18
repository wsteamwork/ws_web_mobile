import { NextSeo } from 'next-seo';
import React, { FC, Fragment } from 'react';
interface IProps {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  ogSitename: string;
  googleMapApiRequire: boolean | false;
}

const NextHead: FC<IProps> = (props) => (
  <Fragment>
    {props.googleMapApiRequire ? (
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=geometry,places`}></script>
    ) : (
      ''
    )}

    <NextSeo
      title={props.title}
      description={props.description}
      canonical={props.url}
      additionalMetaTags={[
        {
          name: 'robots',
          content: 'index,follow'
        }
      ]}
      openGraph={{
        url: props.url,
        title: props.title,
        locale: 'vi-VN',
        description: props.description,
        images: [
          {
            url: props.ogImage,
            width: 1200,
            height: 630
          }
        ],
        site_name: props.ogSitename
      }}
      facebook={{
        appId: '331750437466885'
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image'
      }}
    />
  </Fragment>
);

export default NextHead;
