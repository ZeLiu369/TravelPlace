import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import travelPlaceSlice from './slices/travelPlaceSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    travelPlaces: travelPlaceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 