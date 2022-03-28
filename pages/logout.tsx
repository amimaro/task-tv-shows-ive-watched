import type { NextPage } from "next";
import Head from "next/head";

const Logout: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{"TV shows I've watched"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-3xl font-bold underline">Logout</h1>
      </div>
    </div>
  );
};

export default Logout;