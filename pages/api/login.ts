import type { NextApiRequest, NextApiResponse } from "next";
import { getData, postData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const requestTokenObj = await getData(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY_V3}`
    );

    const loginValidationObj = await postData({
      url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.TMDB_API_KEY_V3}`,
      data: {
        username,
        password,
        request_token: requestTokenObj["request_token"],
      },
    });
    return res.status(200).json(loginValidationObj);
  }

  return res.status(404).json({ message: "Not found" });
}
