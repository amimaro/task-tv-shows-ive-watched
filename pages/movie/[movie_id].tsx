import type { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../store/auth-slice";

const Movie: NextPage = () => {
  const router = useRouter();
  const { movie_id } = router.query;

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
        <title>{"Movie - TV shows I've watched"}</title>
      </Head>

      <div className="">Movie: {movie_id}</div>
    </div>
  );
};

export default Movie;
