import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppMediaWrapper from "../components/AppMediaWrapper";
import AppMediaItem from "../components/AppMediaItem";
import AppPaginator from "../components/AppPaginator";
import AppTitle from "../components/AppTitle";
import {
  getFavoriteMoviesAsync,
  getFavoriteShowsAsync,
  favoriteActions,
  selectFavoriteMovies,
  selectFavoriteShows,
  selectFavoriteMoviesPage,
  selectFavoriteShowsPage,
} from "../store/favorite-slice";
import { selectIsAuth } from "../store/auth-slice";
import Router from "next/router";

const Favorites: NextPage = () => {
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth) {
      Router.push("/");
    }
  }, [isAuth]);

  const [mediaMode, setMediaMode] = useState<"movies" | "shows">("movies");
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const favoriteShows = useSelector(selectFavoriteShows);

  const currentMoviesPage = useSelector(selectFavoriteMoviesPage);
  const currentShowsPage = useSelector(selectFavoriteShowsPage);

  useEffect(() => {
    dispatch(favoriteActions.resetPages());
    dispatch(getFavoriteMoviesAsync());
    dispatch(getFavoriteShowsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getFavoriteMoviesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoviesPage]);

  useEffect(() => {
    dispatch(getFavoriteShowsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShowsPage]);

  const modeClass =
    "hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeModeClass = "hover:opacity-70 border-b-2 border-teal-500";

  const hasData =
    (mediaMode === "movies" && favoriteMovies.length > 0) ||
    (mediaMode === "shows" && favoriteShows.length > 0);

  return (
    <div>
      <Head>
        <title>{"Favorites - TV shows I've watched"}</title>
      </Head>

      <div>
        <div className="flex gap-8 justify-around md:justify-start">
          <button
            onClick={() => setMediaMode("movies")}
            className={mediaMode === "movies" ? activeModeClass : modeClass}
          >
            <AppTitle>Movies</AppTitle>
          </button>
          <button
            onClick={() => setMediaMode("shows")}
            className={mediaMode === "shows" ? activeModeClass : modeClass}
          >
            <AppTitle>Shows</AppTitle>
          </button>
        </div>

        {mediaMode === "movies" && (
          <AppMediaWrapper>
            {favoriteMovies.map((movie: any) => (
              <AppMediaItem
                key={movie.id}
                name={movie.title}
                date={movie.release_date}
                path={`/movie/${movie.id}`}
                poster={movie.poster_path}
                popularity={movie.popularity}
              />
            ))}
          </AppMediaWrapper>
        )}

        {mediaMode === "shows" && (
          <AppMediaWrapper>
            {favoriteShows.map((show: any) => (
              <AppMediaItem
                key={show.id}
                name={show.name}
                date={show.first_air_date}
                path={`/tv/${show.id}`}
                poster={show.poster_path}
                popularity={show.popularity}
              />
            ))}
          </AppMediaWrapper>
        )}

        {!hasData && <AppTitle>No favorite {mediaMode} yet.</AppTitle>}
        {hasData && (
          <div className="pt-4 pb-8">
            <AppPaginator
              currentPage={
                mediaMode === "movies" ? currentMoviesPage : currentShowsPage
              }
              handlePrevious={() => {
                mediaMode === "movies"
                  ? dispatch(
                      favoriteActions.setFavoriteMoviesPage(
                        currentMoviesPage - 1
                      )
                    )
                  : dispatch(
                      favoriteActions.setFavoriteShowsPage(currentShowsPage - 1)
                    );
              }}
              handleNext={() => {
                mediaMode === "movies"
                  ? dispatch(
                      favoriteActions.setFavoriteMoviesPage(
                        currentMoviesPage + 1
                      )
                    )
                  : dispatch(
                      favoriteActions.setFavoriteShowsPage(currentShowsPage + 1)
                    );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
