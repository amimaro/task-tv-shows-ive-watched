/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppMediaItem from "../../../../../../../components/AppMediaItem";
import AppSubtitle from "../../../../../../../components/AppSubtitle";
import AppTitle from "../../../../../../../components/AppTitle";
import { getData } from "../../../../../../../utils/helpers";

const ShowEpisode: NextPage = () => {
  const router = useRouter();
  const { show_id, season_number, episode_number } = router.query;
  const [episodeDetails, setEpisodeDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (
        season_number === undefined ||
        show_id === undefined ||
        episode_number === undefined
      )
        return;
      const episodeDetailsRes = await getData(
        `/api/show-season-episode-details?show_id=${show_id}&season_number=${season_number}&episode_number=${episode_number}`
      );
      setEpisodeDetails(episodeDetailsRes);
    })();
  }, [show_id, season_number, episode_number]);

  if (!episodeDetails) {
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
            Season {parseInt(season_number as string) + 1}, Episode{" "}
            {parseInt(episode_number as string) + 1}: {episodeDetails.name}
          </AppTitle>
          {episodeDetails.air_date.length > 0 && (
            <div className="flex items-center gap-5 font-semibold">
              <div>Release:</div>
              <div>
                {episodeDetails.air_date &&
                  episodeDetails.air_date.length > 0 && (
                    <div>
                      {format(
                        new Date(episodeDetails.air_date),
                        "MMM dd, yyyy"
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
        {episodeDetails.still_path.length > 0 && (
          <div className="flex md:flex-row flex-col md:items-start items-center gap-5">
            <img
              src={`https://image.tmdb.org/t/p/w500${episodeDetails.still_path}`}
              alt={`${name} poster`}
              className="rounded-lg w-96"
            />
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <AppSubtitle>Overview</AppSubtitle>
          <div className="w-96 text-justify">{episodeDetails.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowEpisode;
