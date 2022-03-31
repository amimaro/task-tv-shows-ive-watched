import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { page = 1, query = "" } = req.query;

  const searchedShows = await getData(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY_V3}&query=${query}&page=${page}`
  );

  return res.status(200).json(searchedShows);
}
