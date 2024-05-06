import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: null,
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setAllFilms: (state, action) => {
      state.films = action.payload;
    },
  },
});
