import type { NextApiRequest, NextApiResponse } from "next";
import { getData, postData } from "../../utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const requestTokenObj: any = await getData(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY_V3}`
    );

    const loginValidationObj: any = await postData({
      url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.TMDB_API_KEY_V3}`,
      data: {
        username,
        password,
        request_token: requestTokenObj["request_token"],
      },
    });

    const sessionObj: any = await postData({
      url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.TMDB_API_KEY_V3}`,
      data: {
        request_token: requestTokenObj["request_token"],
      },
    });

    const accountDetailsObj = await getData(
      `https://api.themoviedb.org/3/account?api_key=${process.env.TMDB_API_KEY_V3}&session_id=${sessionObj["session_id"]}`
    );

    return res.status(200).json({
      ...loginValidationObj,
      session_id: sessionObj["session_id"],
      account: accountDetailsObj,
    });
  }

  return res.status(404).json({ message: "Not found" });
}
