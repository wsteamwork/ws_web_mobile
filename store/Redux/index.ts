import rootReducer from '@/store/Redux/Reducers/index';
import { MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { PersistConfig } from 'redux-persist';
import thunk from 'redux-thunk';

export const windowExist = process.browser && typeof window !== undefined;

const makeConfiguredStore = (reducer, initialState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export const makeStore: MakeStore = (initialState, { isServer }) => {
  if (isServer) {
    initialState = initialState || {};

    return makeConfiguredStore(rootReducer, initialState);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig: PersistConfig = {
      key: 'root',
      storage,
      blacklist: [
        'roomHomepage',
        'roomPage',
        'ltroomPage',
        'book',
        'userProfile',
        'iProfile',
        'promotion',
        'notifications',
        'description',
        'amenities',
        'images',
        'details',
        'priceTerm',
        'stepPrice',
        'process',
        'roomlist',
        'listingdetails',
        'updateDetails',
        'createListing',
        'bookinglist'
      ]
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: any = makeConfiguredStore(persistedReducer, initialState);

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};
