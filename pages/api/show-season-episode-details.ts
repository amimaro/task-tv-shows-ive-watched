import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { show_id, season_number, episode_number } = req.query;

  const showEpisodeDetails = await getData(
    `https://api.themoviedb.org/3/tv/${show_id}/season/${season_number}/episode/${episode_number}?api_key=${process.env.TMDB_API_KEY_V3}&language=en-US`
  );

  return res.status(200).json(showEpisodeDetails);
}
