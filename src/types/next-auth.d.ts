import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    };
    error: unknown;
    accessToken: unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: {
      id: string;
      email: string;
    };
  }
}
