import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from TRPC!" });

  return (
    <>
      <Head>
        <title>Pudget</title>
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const user = trpc.user.getUser.useQuery();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {user.data && (
        <p className="text-2xl text-blue-500">
          Logged in as {`${user.data.firstName} ${user.data.lastName}`}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={user.data ? () => signOut() : () => signIn()}
      >
        {user.data ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
