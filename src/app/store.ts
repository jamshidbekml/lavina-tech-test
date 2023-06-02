import { configureStore } from '@reduxjs/toolkit';
import { checkLogoutType } from './middlewares';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(checkLogoutType),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
