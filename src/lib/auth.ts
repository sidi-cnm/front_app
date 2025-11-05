// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type AppUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  password: string; // only for demo; store hashed in real apps!
};

const USERS: AppUser[] = [
  {
    id: "u-1",
    name: "SidiElvaly",
    email: "sidielvaly@gmail.com",
    password: "pass123",
    image: "/images/patients/sidielvaly.jpg",
  },
  {
    id: "u-2",
    name: "Khatu",
    email: "khatu@example.com",
    password: "pass123",
    image: "/images/patients/khatu.jpg",
  },
];

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
        const user = USERS.find(
          u => u.email.toLowerCase() === creds.email.toLowerCase() && u.password === creds.password
        );
        if (!user) return null;

        // Only safe fields here:
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in", // use your custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        session.user.image = (token.picture as string) || session.user.image || undefined;
      }
      return session;
    },
  },
};
