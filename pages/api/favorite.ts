import type { NextApiRequest, NextApiResponse } from "next";
import { postData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { session_id, account_id } = req.query;
    const payload = req.body;

    const markAsFavoriteObj = await postData({
      url: `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${process.env.TMDB_API_KEY_V3}&session_id=${session_id}`,
      data: payload,
    });

    return res.status(200).json(markAsFavoriteObj);
  }

  return res.status(404).json({ message: "Not found" });
}
