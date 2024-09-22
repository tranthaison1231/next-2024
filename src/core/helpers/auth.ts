import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepository } from "@/core/repositories/user";
import { comparePassword } from "@/core/helpers/hash";
import { LoginSchema } from "@/core/schemas/login";
import config from "@/core/lib/config";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "next-auth/jwt";
import { createRefreshToken, createToken, refreshToken } from "./jwt";

async function refreshAccessToken(token: JWT) {
  try {
    const data = await refreshToken(token.refreshToken, token.user.id);

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
  secret: config.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode<{
          exp: number;
        }>(token.accessToken);
        token.accessTokenExpires = decodedToken?.exp * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) return token;

      const newToken = await refreshAccessToken(token);

      return newToken;
    },
    session: ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user as User;
        session.error = token.error;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = LoginSchema.parse(credentials);

          const user = await UserRepository.getUserByEmail(email);

          if (!user) {
            throw new Error("Invalid credentials!");
          }

          const isPasswordCorrect = await comparePassword(
            password,
            user.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials!");
          }

          const accessToken = createToken({ userId: user.id });
          const refreshToken = await createRefreshToken({
            userId: user.id,
          });

          return {
            id: user.id,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "An error occurred!");
          }
          return null;
        }
      },
    }),
  ],
};
