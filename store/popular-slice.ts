import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { getData } from "../utils/helpers";
import {
  getFavoriteMoviesAsync,
  getFavoriteShowsAsync,
} from "./favorite-slice";

export interface IPopularState {
  popularMovies: any;
  popularShows: any;
  popularMoviesPage: number;
  popularShowsPage: number;
}

export const getPopularMoviesAsync = createAsyncThunk(
  "popular/getMovies",
  async (_, { getState, dispatch }) => {
    const state: any = getState();
    const response = await getData(
      `/api/popular-movies?page=${state.popular.popularMoviesPage}`
    );
    dispatch(getFavoriteMoviesAsync());
    return response;
  }
);

export const getPopularShowsAsync = createAsyncThunk(
  "popular/getShows",
  async (_, { getState, dispatch }) => {
    const state: any = getState();
    const response = await getData(
      `/api/popular-shows?page=${state.popular.popularShowsPage}`
    );
    dispatch(getFavoriteShowsAsync());
    return response;
  }
);

export const searchMoviesAsync = createAsyncThunk(
  "popular/searchMovies",
  async (query: string, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `/api/search-movies?page=${state.popular.popularMoviesPage}&query=${query}`
    );
    return response;
  }
);

export const searchShowsAsync = createAsyncThunk(
  "popular/searchShows",
  async (query: string, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `/api/search-shows?page=${state.popular.popularShowsPage}&query=${query}`
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
    resetPages(state) {
      state.popularMoviesPage = 1;
      state.popularShowsPage = 1;
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
    builder.addCase(
      searchMoviesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.popularMovies = action.payload;
      }
    );
    builder.addCase(
      searchShowsAsync.fulfilled,
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
