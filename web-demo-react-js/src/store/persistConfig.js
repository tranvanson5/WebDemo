// reduxPersistConfig.js

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer'; // Import the root reducer

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // chỉ lưu trạng thái của auth vào localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
