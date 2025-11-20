import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

type AppUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  password: string; // demo only
};

const USERS: AppUser[] = [
  {
    id: "u-1",
    name: "Sidi Elvaly",
    email: "sidielvaly@gmail.com",
    password: "pass123",
    image: "/images/patients/sidielvaly.jpg",
  },
  {
    id: "u-2",
    name: "Khatu Ahmed",
    email: "khatu@gmail.com",
    password: "pass123",
    image: "/images/patients/khatu.jpg",
  },
];

// Extend JWT/Session with our custom fields
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

        const safeUser: Pick<AppUser, "id" | "name" | "email" | "image"> = {
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
    // IMPORTANT: your route folder is /app/signin
    signIn: "/signin",
    // optional: surface auth errors on the same page
    error: "/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // prevent open redirects
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {
        // url is relative
        if (url.startsWith("/")) return url;
      }
      return baseUrl;
    },
    async jwt({ token, user }): Promise<AppToken> {
      if (user) {
        token.id = (user as User).id;
        token.name = user.name;
        token.picture = (user as User).image;
      }
      return {
        ...token,
        picture: token.picture ?? undefined,
      };
    },
    async session({ session, token }): Promise<AppSession> {
      const s = session as AppSession;
      if (s.user) {
        s.user.id = (token as AppToken).id;
        s.user.image = (token as AppToken).picture || s.user.image || undefined;
      }
      return s;
    },
  },
};
