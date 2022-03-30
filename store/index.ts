import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import popularSlice from "./popular-slice";
import favoriteSlice from "./favorite-slice";

const persistConfig = {
  key: "tvShows",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  popular: popularSlice.reducer,
  favorite: favoriteSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
