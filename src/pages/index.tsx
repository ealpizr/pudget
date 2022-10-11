import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pudget</title>
      </Head>
      <main className="h-full max-w-[300px]">
        <Sidebar />
      </main>
    </>
  );
};

export default Home;
