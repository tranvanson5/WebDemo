// store.js

import { createStore } from 'redux';
import persistedReducer from './persistConfig'; // Import the persisted reducer

const store = createStore(persistedReducer);

export default store;
