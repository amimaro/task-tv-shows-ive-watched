import type { NextPage } from "next";
import Head from "next/head";

const Favorites: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{"Favorites - TV shows I've watched"}</title>
      </Head>

      <div>
        <h1 className="text-3xl font-bold underline">Favorites</h1>
      </div>
    </div>
  );
};

export default Favorites;
