// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Authslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;