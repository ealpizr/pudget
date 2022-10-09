import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { GetServerSideProps, NextPage } from "next";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface SignInPageProps {
  csrfToken: string | undefined;
}

interface SignInPageQueryParams {
  error?: string;
}

const SignIn: NextPage<SignInPageProps> = ({ csrfToken }) => {
  const query: SignInPageQueryParams = useRouter().query;

  const errors: Record<string, string> = {
    CredentialsSignin: "Invalid credentials",
    SessionRequired: "Sign in to access this page",
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex h-[500px] w-[450px] flex-col justify-center rounded-md border border-gray-300 p-6">
        <p className="mb-8 font-pudgetDisplay text-3xl text-yellow-400">
          Pudget
        </p>
        <h3 className="mb-6 text-2xl">Sign in to Pudget</h3>
        {query.error && (
          <div className="mb-4 flex items-center justify-center gap-2 bg-red-600 p-3 font-bold text-gray-50">
            <ErrorOutlineIcon className="text-3xl" />
            <p>
              {errors[query.error] ? errors[query.error] : "Unable to sign in."}
            </p>
          </div>
        )}
        <form
          className="flex flex-col"
          method="POST"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-4 w-full self-center">
            <p className="mb-1 text-sm">Email</p>
            <input
              className="w-full self-center rounded-md border border-gray-500 py-2 px-3 outline-none"
              placeholder="Your email address"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-6 w-full self-center">
            <p className="mb-1 text-sm">Password</p>
            <input
              className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
              placeholder="Your password"
              type="password"
              name="password"
            />
          </div>
          <button className="mb-2 block w-7/12 self-center rounded-2xl bg-yellow-400 py-3 text-sm font-bold">
            Continue
          </button>
          <Link href="/auth/signup">
            <a className="block w-7/12 self-center rounded-2xl bg-gray-200 py-3 text-center text-sm">
              Create account
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async (
  context
) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
