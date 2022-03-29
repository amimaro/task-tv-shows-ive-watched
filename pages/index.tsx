import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppMediaWrapper from "../components/AppMediaWrapper";
import AppMovieItem from "../components/AppMovieItem";
import AppShowItem from "../components/AppShowItem";
import AppTitle from "../components/AppTitle";
import popularSlice, {
  getPopularMoviesAsync,
  getPopularShowsAsync,
  popularActions,
  selectPopularMovies,
  selectPopularShows,
  selectPopularMoviesPage,
  selectPopularShowsPage,
} from "../store/popular-slice";

const Home: NextPage = () => {
  const [mediaMode, setMediaMode] = useState<"movies" | "shows">("movies");
  const dispatch = useDispatch();
  const popularMovies = useSelector(selectPopularMovies);
  const popularShows = useSelector(selectPopularShows);

  const currentMoviesPage = useSelector(selectPopularMoviesPage);
  const currentShowsPage = useSelector(selectPopularShowsPage);

  useEffect(() => {
    dispatch(popularActions.resetPages());
    dispatch(getPopularMoviesAsync());
    dispatch(getPopularShowsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modeClass =
    "hover:opacity-70 border-b-2 border-transparent hover:border-teal-300";
  const activeModeClass = "hover:opacity-70 border-b-2 border-teal-500";

  return (
    <div>
      <Head>
        <title>{"Home - TV shows I've watched"}</title>
      </Head>

      <div>
        <div className="flex justify-center md:mb-0 mb-6 ">
          <AppTitle>What is popular now?</AppTitle>
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
              <AppMovieItem movie={movie} key={movie.id} />
            ))}
          </AppMediaWrapper>
        )}

        {mediaMode === "shows" && (
          <AppMediaWrapper>
            {popularShows.map((show: any) => (
              <AppShowItem show={show} key={show.id} />
            ))}
          </AppMediaWrapper>
        )}
      </div>
    </div>
  );
};

export default Home;
