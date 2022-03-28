import type { NextApiRequest, NextApiResponse } from "next";
import { postData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "DELETE") {
    const { session_id } = req.body;

    const logoutObj = await postData({
      url: `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.TMDB_API_KEY_V3}`,
      data: {
        session_id,
      },
    });
    return res.status(200).json(logoutObj);
  }

  return res.status(404).json({ message: "Not found" });
}
