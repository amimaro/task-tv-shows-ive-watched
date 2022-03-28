import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{"Home - TV shows I've watched"}</title>
      </Head>

      <div>
        <h1 className="text-3xl font-bold underline">Home</h1>
      </div>
    </div>
  );
};

export default Home;
