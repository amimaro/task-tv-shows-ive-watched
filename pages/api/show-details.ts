import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { tv_id } = req.query;

  const showDetails = await getData(
    `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${process.env.TMDB_API_KEY_V3}&language=en-US`
  );

  return res.status(200).json(showDetails);
}
