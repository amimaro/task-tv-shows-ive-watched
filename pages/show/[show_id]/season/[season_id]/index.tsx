import type { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../../../../store/auth-slice";

const ShowSeason: NextPage = () => {
  const router = useRouter();
  const { season_id } = router.query;

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
        <title>{"Season - TV shows I've watched"}</title>
      </Head>

      <div className="">ShowSeason: {season_id}</div>
    </div>
  );
};

export default ShowSeason;
