"use server";

import { authOptions } from "@/core/helpers/auth";
import { getServerSession } from "next-auth";
import { UserRepository } from "@/core/repositories/user";

export const getMe = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;
  return await UserRepository.getUserByEmail(session.user?.email!);
};
