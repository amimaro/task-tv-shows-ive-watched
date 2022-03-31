import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { IMarkAsViewed } from "../types/viewed";

export interface IViewedState {
  viewedMovies: Array<IMarkAsViewed>;
  viewedShows: Array<IMarkAsViewed>;
  viewedMoviesPage: number;
  viewedShowsPage: number;
}

const initialState: IViewedState = {
  viewedMovies: [],
  viewedShows: [],
  viewedMoviesPage: 1,
  viewedShowsPage: 1,
};

const viewedSlice = createSlice({
  name: "viewed",
  initialState,
  reducers: {
    setViewedMoviesPage(state, action) {
      state.viewedMoviesPage = action.payload;
    },
    setViewedShowsPage(state, action) {
      state.viewedShowsPage = action.payload;
    },
    resetPages(state) {
      state.viewedMoviesPage = 1;
      state.viewedShowsPage = 1;
    },
    markAsViewed(state, action) {
      const newItem = action.payload;
      if (action.payload.media_type === "movie") {
        const existingItem = state.viewedMovies.find(
          (item) => item.media_id === newItem.media_id
        );
        if (existingItem) {
          existingItem.viewed = newItem.viewed;
        } else {
          state.viewedMovies.push(newItem);
        }
      } else {
        const existingItem = state.viewedShows.find(
          (item) => item.media_id === newItem.media_id
        );
        if (existingItem) {
          existingItem.viewed = newItem.viewed;
        } else {
          state.viewedShows.push(newItem);
        }
      }
    },
  },
});

export const viewedActions = viewedSlice.actions;

export const selectViewedMoviesPage = (state: AppState) => {
  return state.viewed.viewedMoviesPage;
};

export const selectViewedShowsPage = (state: AppState) => {
  return state.viewed.viewedShowsPage;
};

export const selectViewedMovies = (state: AppState) => {
  return state.viewed.viewedMovies
    .filter((media) => media.viewed)
    .map((media) => media.media_obj)
    .slice(
      (state.viewed.viewedMoviesPage - 1) * 20,
      state.viewed.viewedMoviesPage * 20
    );
};

export const selectViewedShows = (state: AppState) => {
  return state.viewed.viewedShows
    .filter((media) => media.viewed)
    .map((media) => media.media_obj)
    .slice(
      (state.viewed.viewedShowsPage - 1) * 20,
      state.viewed.viewedShowsPage * 20
    );
};

export const selectViewedMoviesWithStatus = (state: AppState) => {
  return state.viewed.viewedMovies;
};

export const selectViewedShowsWithStatus = (state: AppState) => {
  return state.viewed.viewedShows;
};

export default viewedSlice;
