import { createSlice } from '@reduxjs/toolkit';

// watchlist ko localStorage se uthao
const getWatchlist = () => {
  try {
    const data = localStorage.getItem('watchlist');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// watchlist ko localStorage me save karo
const saveWatchlist = (list) => {
  localStorage.setItem('watchlist', JSON.stringify(list));
};

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    homeMovies: [],
    watchlist: getWatchlist(),
  },
  reducers: {
    appendHomeMovies: (state, action) => {
      const incoming = action.payload;

      incoming.forEach(movie => {
        const alreadyAdded = state.homeMovies.some(
          item => item.id === movie.id
        );

        if (!alreadyAdded) {
          state.homeMovies.push(movie);
        }
      });
    },

    setHomeMovies: (state, action) => {
      state.homeMovies = action.payload;
    },

    clearHomeMovies: (state) => {
      state.homeMovies = [];
    },

    addToWatchlist: (state, action) => {
      const movie = action.payload;

      const alreadySaved = state.watchlist.some(
        item => item.id === movie.id
      );

      if (!alreadySaved) {
        state.watchlist.push(movie);
        saveWatchlist(state.watchlist);
      }
    },

    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;

      state.watchlist = state.watchlist.filter(
        movie => movie.id !== movieId
      );

      saveWatchlist(state.watchlist);
    },
  },
});

export const {
  appendHomeMovies,
  setHomeMovies,
  clearHomeMovies,
  addToWatchlist,
  removeFromWatchlist,
} = movieSlice.actions;

export default movieSlice.reducer;
