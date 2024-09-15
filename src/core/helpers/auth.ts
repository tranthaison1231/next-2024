import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepository } from "@/core/repositories/user";
import { comparePassword } from "@/core/helpers/hash";
import { LoginSchema } from "@/core/schemas/login";
import config from "@/core/lib/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: config.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token }) {
      return token;
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
