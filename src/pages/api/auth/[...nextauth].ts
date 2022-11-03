import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = Number.parseInt(token.sub);
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
          };
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
