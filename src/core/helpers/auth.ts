import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepository } from "@/core/repositories/user";
import { comparePassword } from "@/core/helpers/hash";
import { LoginSchema } from "@/core/schemas/login";
import config from "@/core/lib/config";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch("/api/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: error,
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30,
  },
  secret: config.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (token.accessToken) {
        const decodedToken = jwtDecode<{
          exp: number;
        }>(token.accessToken);
        token.accessTokenExpires = decodedToken?.exp * 1000;
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
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

          return {
            id: user.id,
            email: user.email,
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjEyNDEyNDE0fQ.U9cWDh4hidg5Hi8yjzD5xJBuGuySwOOOhMpq3bfg6R4",
            refreshToken: "14124",
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
