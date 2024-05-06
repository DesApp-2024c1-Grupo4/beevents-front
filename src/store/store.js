import { configureStore } from '@reduxjs/toolkit';
import { filmsSlice } from './filmSlice';

export const storeActions = {
  films: filmsSlice.actions,
};

export const store = configureStore({
  reducer: {
    films: filmsSlice.reducer,
  },
});
