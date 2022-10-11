import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Link href="/dashboard">
        <button className="border border-gray-600 p-6 font-bold">
          Go to dashboard
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
