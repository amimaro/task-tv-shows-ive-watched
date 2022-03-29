import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { getData } from "../utils/helpers";

export interface IPopularState {
  popularMovies: any;
  popularShows: any;
  popularMoviesPage: number;
  popularShowsPage: number;
}

export const getPopularMoviesAsync = createAsyncThunk(
  "popular/getMovies",
  async (_, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `api/popular-movies?page=${state.popular.popularMoviesPage}`
    );
    return response;
  }
);

export const getPopularShowsAsync = createAsyncThunk(
  "popular/getShows",
  async (_, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `api/popular-shows?page=${state.popular.popularShowsPage}`
    );
    return response;
  }
);

const initialState: IPopularState = {
  popularMovies: null,
  popularShows: null,
  popularMoviesPage: 1,
  popularShowsPage: 1,
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularMoviesPage(state, action) {
      state.popularMoviesPage = action.payload;
    },
    setPopularShowsPage(state, action) {
      state.popularShowsPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPopularMoviesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.popularMovies = action.payload;
      }
    );
    builder.addCase(
      getPopularShowsAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.popularShows = action.payload;
      }
    );
  },
});

export const popularActions = popularSlice.actions;

export const selectPopularMoviesPage = (state: AppState) => {
  return state.popular.popularMoviesPage;
};

export const selectPopularShowsPage = (state: AppState) => {
  return state.popular.popularShowsPage;
};

export const selectPopularMovies = (state: AppState) => {
  if (!state.popular.popularMovies) return [];
  return state.popular.popularMovies.results;
};

export const selectPopularShows = (state: AppState) => {
  if (!state.popular.popularShows) return [];
  return state.popular.popularShows.results;
};

export default popularSlice;
