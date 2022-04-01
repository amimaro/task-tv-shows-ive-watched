/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppMediaItem from "../../../../../components/AppMediaItem";
import AppNote from "../../../../../components/AppNote";
import AppTitle from "../../../../../components/AppTitle";
import { getData } from "../../../../../utils/helpers";

const ShowSeason: NextPage = () => {
  const router = useRouter();
  const { show_id, season_number } = router.query;
  const [seasonDetails, setSeasonDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (season_number === undefined || show_id === undefined) return;
      const seasonDetailsRes = await getData(
        `/api/show-season-details?show_id=${show_id}&season_number=${season_number}`
      );
      setSeasonDetails(seasonDetailsRes);
    })();
  }, [show_id, season_number]);

  if (!seasonDetails) {
    return <div>loading...</div>;
  }

  return (
    <div className="h-full">
      <Head>
        <title>{"Show - TV shows I've watched"}</title>
      </Head>

      <div className="flex flex-col items-center gap-5 pb-10">
        <div className="flex flex-col items-center">
          <AppTitle>
            Season {parseInt(season_number as string) + 1}: {seasonDetails.name}
          </AppTitle>
          {seasonDetails.air_date.length > 0 && (
            <div className="flex items-center gap-5 font-semibold">
              <div>Release:</div>
              <div>
                {seasonDetails.air_date &&
                  seasonDetails.air_date.length > 0 && (
                    <div>
                      {format(new Date(seasonDetails.air_date), "MMM dd, yyyy")}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
        <div className="flex md:flex-row flex-col md:items-start items-center gap-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`}
            alt={`${name} poster`}
            className="rounded-lg w-96"
          />
        </div>
        {seasonDetails.episodes.length > 0 && (
          <>
            <AppTitle>Episodes</AppTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {seasonDetails.episodes.map((episode: any) => (
                <AppMediaItem
                  key={episode.id}
                  id={episode.id}
                  name={`${episode.name}`}
                  date={episode.air_date}
                  path={`/show/${show_id}/season/${season_number}/episode/${episode.episode_number}`}
                  poster="episode"
                  popularity={-1}
                  mediaType="tv"
                  mediaObj={episode}
                />
              ))}
            </div>
          </>
        )}
        <AppNote mediaId={seasonDetails.id} />
      </div>
    </div>
  );
};

export default ShowSeason;
