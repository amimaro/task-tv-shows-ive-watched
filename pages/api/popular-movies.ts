import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { page = 1 } = req.query;

  const favoriteMovies = await getData(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY_V3}&language=en-US&page=${page}`
  );

  return res.status(200).json(favoriteMovies);
}
