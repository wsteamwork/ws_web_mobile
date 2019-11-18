import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import animationData from '@/assets/lottie/network_error.json';
import Lottie from 'react-lottie';
import Link from 'next/link';
import NextHead from '@/components/NextHead';
import { NextPage } from 'next';
import ButtonGlobal from '@/components/ButtonGlobal';
import GridContainer from '@/components/Layout/Grid/Container';

const Error500: NextPage = (props) => {
  const defaultOptions = {
    loop: false,
    animationData: animationData
  };

  return (
    <GridContainer xs={12} classNameItem="pageError">
      <NextHead
        googleMapApiRequire={false}
        ogSitename="Westay - Đặt phòng homestay trực tuyến"
        title="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        description="Đặt phòng homestay nhanh chóng, trải nghiệm hạng sang tại Westay"
        url="/signup"
        ogImage="/static/favicon.ico">
      </NextHead>

      <Grid container>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="h2" className={'boldText'}>
              Whoops!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Có chuyện gì đó đã xảy ra...</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Mã lỗi: 404</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={'weightLow'}>
              Có vẻ như đã có lỗi xảy ra.
            </Typography>
            <br />
            <Typography variant="subtitle2" className={'weightLow'}>
              Liên hệ ngay với chúng tôi thông qua số điện thoại: 0916 374 057 nếu bạn cần trợ giúp
              ngay lập tức
            </Typography>
          </Grid>
          <Grid item xs={12}>
            Hoặc quay lại trang chủ:
            <br />
            <ul className={'list'}>
              <li>
                <Link href="/">
                  <a>
                    <ButtonGlobal>Quay lại trang chủ</ButtonGlobal>
                  </a>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6}>
          <Grid item xs={12} className="lottie">
            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default Error500;
