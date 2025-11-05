import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

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

// Extend the JWT and Session types to include our custom id/picture fields
interface AppToken extends JWT {
  id?: string;
  picture?: string;
}

interface AppSession extends Session {
  user: Session["user"] & { id?: string };
}

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
          (u) =>
            u.email.toLowerCase() === creds.email.toLowerCase() &&
            u.password === creds.password
        );
        if (!user) return null;

        // Only safe fields here:
        const safeUser: Omit<AppUser, "password"> = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
        return safeUser as unknown as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }): Promise<AppToken> {
      if (user) {
        token.id = (user as User).id;
        token.name = user.name;
        token.picture = (user as User).image;
      }
      // Ensure picture is string | undefined (convert null -> undefined) and return AppToken
      const appToken: AppToken = {
        ...token,
        picture: token.picture ?? undefined,
      };
      return appToken;
    },
    async session({ session, token }): Promise<AppSession> {
      const s = session as AppSession;
      if (s.user) {
        s.user.id = (token as AppToken).id;
        s.user.image =
          (token as AppToken).picture || s.user.image || undefined;
      }
      return s;
    },
  },
};
