/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppMediaControlItem from "../../../components/AppMediaControlItem";
import AppMediaItem from "../../../components/AppMediaItem";
import AppPopularityIndicator from "../../../components/AppPopularityIndicator";
import AppTitle from "../../../components/AppTitle";
import { getData } from "../../../utils/helpers";

const Show: NextPage = () => {
  const router = useRouter();
  const { show_id } = router.query;
  const [showDetails, setShowDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!show_id) return;
      const showDetailsRes = await getData(
        `/api/show-details?show_id=${show_id}`
      );
      setShowDetails(showDetailsRes);
    })();
  }, [show_id]);

  if (!showDetails) {
    return <div>loading...</div>;
  }

  return (
    <div className="h-full">
      <Head>
        <title>{"Show - TV shows I've watched"}</title>
      </Head>

      <div className="flex flex-col items-center gap-5 pb-10">
        <AppTitle>{showDetails.name}</AppTitle>
        <div className="flex md:flex-row flex-col md:items-start items-center gap-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
            alt={`${name} poster`}
            className="rounded-lg w-96"
          />
          <div className="flex flex-col px-2 gap-5">
            <div className="flex flex-col gap-5">
              <div className="font-semibold">Overview</div>
              <div className="w-96  text-justify">{showDetails.overview}</div>
              <div className="flex items-center gap-5 font-semibold">
                <div>Popularity:</div>
                <AppMediaControlItem>
                  <AppPopularityIndicator popularity={showDetails.popularity} />
                </AppMediaControlItem>
              </div>
              <div className="flex items-center gap-5 font-semibold">
                <div>Release:</div>
                <div>
                  {showDetails.first_air_date &&
                    showDetails.first_air_date.length > 0 && (
                      <div>
                        {format(
                          new Date(showDetails.first_air_date),
                          "MMM dd, yyyy"
                        )}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex flex-wrap gap-5 w-80">
                {showDetails.genres.map((genre: any) => (
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
        {showDetails.seasons.length > 0 && (
          <>
            <AppTitle>Seasons</AppTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {showDetails.seasons.map((season: any) => (
                <AppMediaItem
                  key={season.id}
                  id={season.id}
                  name={`Season: ${season.season_number + 1} | Episodes: ${
                    season.episode_count
                  }`}
                  date={season.first_air_date}
                  path={`/show/${show_id}/season/${season.season_number}`}
                  poster={season.poster_path}
                  popularity={-1}
                  mediaType="tv"
                  mediaObj={season}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Show;
