import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppMediaWrapper from "../components/AppMediaWrapper";
import AppMediaItem from "../components/AppMediaItem";
import AppPaginator from "../components/AppPaginator";
import AppTitle from "../components/AppTitle";
import {
  getPopularMoviesAsync,
  getPopularShowsAsync,
  popularActions,
  selectPopularMovies,
  selectPopularShows,
  selectPopularMoviesPage,
  selectPopularShowsPage,
  searchMoviesAsync,
  searchShowsAsync,
} from "../store/popular-slice";
import useDebounce from "../hooks/useDebounce";

const Home: NextPage = () => {
  const [mediaMode, setMediaMode] = useState<"movies" | "shows">("movies");
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const popularMovies = useSelector(selectPopularMovies);
  const popularShows = useSelector(selectPopularShows);
  const currentMoviesPage = useSelector(selectPopularMoviesPage);
  const currentShowsPage = useSelector(selectPopularShowsPage);

  useDebounce(1000, searchInput, () => {
    if (searchInput.length > 0) {
      if (mediaMode === "movies") {
        dispatch(searchMoviesAsync(searchInput));
        dispatch(popularActions.setPopularMoviesPage(1));
      } else {
        dispatch(searchShowsAsync(searchInput));
        dispatch(popularActions.setPopularShowsPage(1));
      }
    } else {
      if (mediaMode === "movies") {
        dispatch(getPopularMoviesAsync());
        dispatch(popularActions.setPopularMoviesPage(1));
      } else {
        dispatch(getPopularShowsAsync());
        dispatch(popularActions.setPopularShowsPage(1));
      }
    }
  });

  useEffect(() => {
    dispatch(popularActions.resetPages());
    dispatch(getPopularMoviesAsync());
    dispatch(getPopularShowsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPopularMoviesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoviesPage]);

  useEffect(() => {
    dispatch(getPopularShowsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShowsPage]);

  const modeClass =
    "hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeModeClass = "hover:opacity-70 border-b-2 border-teal-500";

  return (
    <div>
      <Head>
        <title>{"Home - TV shows I've watched"}</title>
      </Head>

      <div>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent border-b-2 w-full text-3xl"
            placeholder="Search for your Favorite Movies and TV Shows"
          />
        </div>

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
            {popularMovies.map((movie: any) => (
              <AppMediaItem
                key={movie.id}
                id={movie.id}
                name={movie.title}
                date={movie.release_date}
                path={`/movie/${movie.id}`}
                poster={movie.poster_path}
                popularity={movie.popularity}
                mediaType="movie"
              />
            ))}
          </AppMediaWrapper>
        )}

        {mediaMode === "shows" && (
          <AppMediaWrapper>
            {popularShows.map((show: any) => (
              <AppMediaItem
                key={show.id}
                id={show.id}
                name={show.name}
                date={show.first_air_date}
                path={`/tv/${show.id}`}
                poster={show.poster_path}
                popularity={show.popularity}
                mediaType="tv"
              />
            ))}
          </AppMediaWrapper>
        )}

        <div className="pt-4 pb-8">
          <AppPaginator
            currentPage={
              mediaMode === "movies" ? currentMoviesPage : currentShowsPage
            }
            handlePrevious={() => {
              mediaMode === "movies"
                ? dispatch(
                    popularActions.setPopularMoviesPage(currentMoviesPage - 1)
                  )
                : dispatch(
                    popularActions.setPopularShowsPage(currentShowsPage - 1)
                  );
            }}
            handleNext={() => {
              mediaMode === "movies"
                ? dispatch(
                    popularActions.setPopularMoviesPage(currentMoviesPage + 1)
                  )
                : dispatch(
                    popularActions.setPopularShowsPage(currentShowsPage + 1)
                  );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
