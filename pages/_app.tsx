import { makeStore, windowExist } from '@/store/Redux';
import { getProfile } from '@/store/Redux/Reducers/Profile/profile';
import '@/styles/index.scss';
import ProviderGlobal from '@/utils/ProviderGlobal';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import withRedux, { NextJSContext } from 'next-redux-wrapper';
import App, { AppContext, AppProps, Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'tippy.js/themes/light-border.css';
// import ''
config.autoAddCss = false;

interface NextContextApp extends NextJSContext, AppContext { }
interface IProps extends AppProps {
  isServer: boolean;
  store: any;
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx, router }: any) {
    let pageProps = {};

    ctx.router = router;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleRouteChangeStart);
    Router.events.on('routeChangeStart', this.handleRouteChangeEnd);
    Router.events.on('routeChangeError', this.handleRouteChangeEnd);
    if (windowExist) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister();
        });
        // navigator.serviceWorker
        //   .getRegistrations()
        //   .then(function (registrations) {
        //     for (let registration of registrations) {
        //       registration.unregister();
        //     }
        //     console.log('unregistered')
        //   })
        //   .catch(function (err) {
        //     console.log('Service Worker registration failed: ', err);
        //   });
      }
    }
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    getProfile(this.props.store.dispatch);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChangeStart);
    Router.events.off('routeChangeStart', this.handleRouteChangeEnd);
    Router.events.off('routeChangeError', this.handleRouteChangeEnd);
  }

  handleRouteChangeStart = () => {
    NProgress.start();
  };

  handleRouteChangeEnd = () => {
    NProgress.done();
  };

  render() {
    const { Component, pageProps, isServer, store } = this.props;

    return (
      <Container>
        <ProviderGlobal>
          <Provider store={store}>
            <PersistGate
              persistor={store.__persistor}
              loading={!process.browser ? <Component {...pageProps} /> : null}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ProviderGlobal>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
