import type { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../../../../../../store/auth-slice";

const ShowEpisode: NextPage = () => {
  const router = useRouter();
  const { episode_id } = router.query;

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth) {
      Router.push("/");
    }
  }, [isAuth]);

  return (
    <div className="h-full">
      <Head>
        <title>{"Episode - TV shows I've watched"}</title>
      </Head>

      <div className="">ShowEpisode: {episode_id}</div>
    </div>
  );
};

export default ShowEpisode;
