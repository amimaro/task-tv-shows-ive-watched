import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { movie_id } = req.query;

  const movieDetails = await getData(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY_V3}&language=en-US`
  );

  return res.status(200).json(movieDetails);
}
