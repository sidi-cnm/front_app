import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;

        // ✅ Get user from DB
        const user = await db.user.findUnique({
          where: { email: creds.email.toLowerCase() },
        });

        if (!user) return null;

        // ✅ Compare hashed password
        const isValid = await bcrypt.compare(
          creds.password,
          user.passwordHash
        );

        if (!isValid) return null;

        // ✅ Return safe user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.picture;
      return session;
    },
  },
};
