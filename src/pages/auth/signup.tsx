import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { clientEnv } from "../../env/schema.mjs";
import { signUpDataSchema } from "../../utils/schemas";
import { trpc } from "../../utils/trpc";
import SignupIllustration from "./signup-illustration.svg";

type Inputs = z.infer<typeof signUpDataSchema>;

const SignUp: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(signUpDataSchema) });

  const authSignUp = trpc.auth.signUp.useMutation({
    onError() {
      // TODO: Handle errors
      return;
    },
    onSuccess() {
      router.push(`${clientEnv.NEXT_PUBLIC_URL}/auth/signin`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authSignUp.mutate(data);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1200px] flex-col items-center gap-6 p-4 lg:flex-row">
        <div className="flex items-center gap-4 self-start">
          <Link href="/auth/signin">
            <a className="rounded-full bg-gray-300 p-1 lg:hidden">
              <ArrowBackIcon />
            </a>
          </Link>
          <h3 className="lg:hidden">Create account</h3>
        </div>
        <div className="flex w-3/4 items-center justify-center lg:hidden">
          <Image src={SignupIllustration} alt="Illustration" />
        </div>
        <div className="w-full max-w-[500px] lg:flex lg:gap-3">
          <Link href="/auth/signin">
            <a className="hidden h-fit rounded-full bg-gray-300 p-1 lg:block">
              <ArrowBackIcon />
            </a>
          </Link>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 lg:p-1"
          >
            {Object.values(errors)[0]?.message && (
              <div className="flex items-center justify-center gap-2 bg-red-600 p-3 font-bold text-gray-50 lg:hidden">
                <ErrorOutlineIcon className="text-3xl" />
                <p>{Object.values(errors)[0]?.message}</p>
              </div>
            )}
            <h3 className="hidden lg:block">Create account</h3>
            {Object.values(errors)[0]?.message && (
              <div className="hidden items-center justify-center gap-2 bg-red-600 p-3 font-bold text-gray-50 lg:flex">
                <ErrorOutlineIcon className="text-3xl" />
                <p>{Object.values(errors)[0]?.message}</p>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="">
                <p className="mb-1 text-sm">First name</p>
                <input
                  {...register("firstName")}
                  className={`w-full rounded-md border border-gray-500 py-2 px-3 outline-none`}
                  placeholder="First name"
                  type="text"
                  name="firstName"
                />
              </div>
              <div className="">
                <p className="mb-1 text-sm">Last name</p>
                <input
                  {...register("lastName")}
                  className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                />
              </div>
            </div>
            <div className="">
              <p className="mb-1 text-sm">Email</p>
              <input
                {...register("email")}
                className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
                placeholder="Your email address"
                type="email"
                name="email"
              />
            </div>
            <div className="">
              <p className="mb-1 text-sm">Password</p>
              <input
                {...register("password")}
                className="w-full rounded-md border border-gray-500 py-2 px-3 outline-none"
                placeholder="Minimum 8 characters"
                type="password"
                name="password"
              />
            </div>
            <button
              type="submit"
              className="mx-auto mt-2 block w-7/12 rounded-2xl bg-yellow-400 py-4 text-sm font-bold"
            >
              Create account
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <a className="cursor-pointer font-bold text-yellow-400 underline">
                Sign in!
              </a>
            </p>
          </form>
        </div>
        <div className="relative ml-10 hidden h-full min-w-[425px] flex-1 lg:block">
          <Image src={SignupIllustration} alt="Illustration" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
