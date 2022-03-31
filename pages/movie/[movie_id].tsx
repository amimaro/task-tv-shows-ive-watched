/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppMediaControlItem from "../../components/AppMediaControlItem";
import AppPopularityIndicator from "../../components/AppPopularityIndicator";
import AppTitle from "../../components/AppTitle";
import { getData } from "../../utils/helpers";

const Movie: NextPage = () => {
  const router = useRouter();
  const { movie_id } = router.query;
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!movie_id) return;
      const movieDetailsRes = await getData(
        `/api/movie-details?movie_id=${movie_id}`
      );
      setMovieDetails(movieDetailsRes);
    })();
  }, [movie_id]);

  if (!movieDetails) {
    return <div>loading...</div>;
  }

  return (
    <div className="h-full">
      <Head>
        <title>{"Movie - TV shows I've watched"}</title>
      </Head>

      <div className="flex flex-col items-center gap-5">
        <AppTitle>{movieDetails.title}</AppTitle>
        <div className="flex md:flex-row flex-col md:items-start items-center gap-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={`${name} poster`}
            className="rounded-lg w-96"
          />
          <div className="flex flex-col px-2 gap-5">
            <div className="flex flex-col gap-5">
              <div className="font-semibold">Overview</div>
              <div className="w-96  text-justify">{movieDetails.overview}</div>
              <div className="flex items-center gap-5 font-semibold">
                <div>Popularity:</div>
                <AppMediaControlItem>
                  <AppPopularityIndicator
                    popularity={movieDetails.popularity}
                  />
                </AppMediaControlItem>
              </div>
              <div className="flex items-center gap-5 font-semibold">
                <div>Release:</div>
                <div>
                  {movieDetails.release_date &&
                    movieDetails.release_date.length > 0 && (
                      <div>
                        {format(
                          new Date(movieDetails.release_date),
                          "MMM dd, yyyy"
                        )}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex flex-wrap gap-5 w-80">
                {movieDetails.genres.map((genre: any) => (
                  <div
                    key={genre.id}
                    className="text-white bg-teal-800 py-2 px-4 rounded-full font-semibold"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
