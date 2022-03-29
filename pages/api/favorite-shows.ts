import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { session_id, account_id, page = 1 } = req.query;

  const favoriteShows = await getData(
    `https://api.themoviedb.org/3/account/${account_id}/favorite/tv?api_key=${process.env.TMDB_API_KEY_V3}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=${page}`
  );

  return res.status(200).json(favoriteShows);
}
