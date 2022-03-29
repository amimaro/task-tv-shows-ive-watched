import type { NextApiRequest, NextApiResponse } from "next";
import { deleteData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "DELETE") {
    const { session_id } = req.body;
    if (!session_id) {
      return res.status(400).json({ message: "Bad request" });
    }

    const logoutRequest = await deleteData({
      url: `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.TMDB_API_KEY_V3}`,
      data: {
        session_id,
      },
    });

    return res.status(200).json(logoutRequest);
  }

  return res.status(404).json({ message: "Not found" });
}
