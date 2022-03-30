import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { getData } from "../utils/helpers";

export interface IFavoriteState {
  favoriteMovies: any;
  favoriteShows: any;
  favoriteMoviesPage: number;
  favoriteShowsPage: number;
}

export const getFavoriteMoviesAsync = createAsyncThunk(
  "favorite/getMovies",
  async (_, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `api/favorite-movies?session_id=${state.auth.auth_obj.session_id}&account_id=${state.auth.auth_obj.account_id}&page=${state.favorite.favoriteMoviesPage}`
    );
    return response;
  }
);

export const getFavoriteShowsAsync = createAsyncThunk(
  "favorite/getShows",
  async (_, { getState }) => {
    const state: any = getState();
    const response = await getData(
      `api/favorite-shows?session_id=${state.auth.auth_obj.session_id}&account_id=${state.auth.auth_obj.account_id}&page=${state.favorite.favoriteShowsPage}`
    );
    return response;
  }
);

const initialState: IFavoriteState = {
  favoriteMovies: null,
  favoriteShows: null,
  favoriteMoviesPage: 1,
  favoriteShowsPage: 1,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavoriteMoviesPage(state, action) {
      state.favoriteMoviesPage = action.payload;
    },
    setFavoriteShowsPage(state, action) {
      state.favoriteShowsPage = action.payload;
    },
    resetPages(state) {
      state.favoriteMoviesPage = 1;
      state.favoriteShowsPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getFavoriteMoviesAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.favoriteMovies = action.payload;
      }
    );
    builder.addCase(
      getFavoriteShowsAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.favoriteShows = action.payload;
      }
    );
  },
});

export const favoriteActions = favoriteSlice.actions;

export const selectFavoriteMoviesPage = (state: AppState) => {
  return state.favorite.favoriteMoviesPage;
};

export const selectFavoriteShowsPage = (state: AppState) => {
  return state.favorite.favoriteShowsPage;
};

export const selectFavoriteMovies = (state: AppState) => {
  if (!state.favorite.favoriteMovies) return [];
  return state.favorite.favoriteMovies.results;
};

export const selectFavoriteShows = (state: AppState) => {
  if (!state.favorite.favoriteShows) return [];
  return state.favorite.favoriteShows.results;
};

export default favoriteSlice;
