import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import weatherReducer from './slices/weatherSlice';
import mandiReducer from './slices/mandiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    weather: weatherReducer,
    mandi: mandiReducer,
  },
});