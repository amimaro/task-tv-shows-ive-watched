import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppMediaWrapper from "../components/AppMediaWrapper";
import AppMediaItem from "../components/AppMediaItem";
import AppPaginator from "../components/AppPaginator";
import AppTitle from "../components/AppTitle";
import {
  viewedActions,
  selectViewedMoviesPage,
  selectViewedShowsPage,
  selectViewedShows,
  selectViewedMovies,
} from "../store/viewed-slice";
import { selectIsAuth } from "../store/auth-slice";
import Router from "next/router";

const Viewed: NextPage = () => {
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth) {
      Router.push("/");
    }
  }, [isAuth]);

  const [mediaMode, setMediaMode] = useState<"movies" | "shows">("movies");
  const dispatch = useDispatch();
  const viewedMovies = useSelector(selectViewedMovies);
  const viewedShows = useSelector(selectViewedShows);

  const currentMoviesPage = useSelector(selectViewedMoviesPage);
  const currentShowsPage = useSelector(selectViewedShowsPage);

  useEffect(() => {
    dispatch(viewedActions.resetPages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modeClass =
    "hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeModeClass = "hover:opacity-70 border-b-2 border-teal-500";

  const hasData =
    (mediaMode === "movies" && viewedMovies && viewedMovies.length > 0) ||
    (mediaMode === "shows" && viewedShows && viewedShows.length > 0);

  return (
    <div>
      <Head>
        <title>{"Viewed - TV shows I've watched"}</title>
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

        {hasData && mediaMode === "movies" && (
          <AppMediaWrapper>
            {viewedMovies.map((movie: any) => (
              <AppMediaItem
                key={movie.id}
                id={movie.id}
                name={movie.title}
                date={movie.release_date}
                path={`/movie/${movie.id}`}
                poster={movie.poster_path}
                popularity={movie.popularity}
                mediaType="movie"
                mediaObj={movie}
              />
            ))}
          </AppMediaWrapper>
        )}

        {hasData && mediaMode === "shows" && (
          <AppMediaWrapper>
            {viewedShows.map((show: any) => (
              <AppMediaItem
                key={show.id}
                id={show.id}
                name={show.name}
                date={show.first_air_date}
                path={`/show/${show.id}`}
                poster={show.poster_path}
                popularity={show.popularity}
                mediaType="tv"
                mediaObj={show}
              />
            ))}
          </AppMediaWrapper>
        )}

        {!hasData && <AppTitle>No viewed {mediaMode} yet.</AppTitle>}
        {hasData && (
          <div className="pt-4 pb-8">
            <AppPaginator
              currentPage={
                mediaMode === "movies" ? currentMoviesPage : currentShowsPage
              }
              handlePrevious={() => {
                mediaMode === "movies"
                  ? dispatch(
                      viewedActions.setViewedMoviesPage(currentMoviesPage - 1)
                    )
                  : dispatch(
                      viewedActions.setViewedShowsPage(currentShowsPage - 1)
                    );
              }}
              handleNext={() => {
                mediaMode === "movies"
                  ? dispatch(
                      viewedActions.setViewedMoviesPage(currentMoviesPage + 1)
                    )
                  : dispatch(
                      viewedActions.setViewedShowsPage(currentShowsPage + 1)
                    );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewed;
