import jwt from "jsonwebtoken";
import config from "@/core/lib/config";
import { generateOpaqueToken } from "./token";
import { redisService } from "@/core/services/redis";

export const ACCESS_TOKEN_EXPIRE_IN = 10;
export const REFRESH_TOKEN_EXPIRE_IN = 60 * 60 * 24 * 30;

export const createToken = ({ userId }: { userId: string }) => {
  return jwt.sign({ userId: userId }, config.NEXTAUTH_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE_IN,
  });
};

export const createRefreshToken = async ({ userId }: { userId: string }) => {
  const refreshToken = generateOpaqueToken();

  await redisService.set(
    `refresh-token:${userId}`,
    refreshToken,
    "EX",
    REFRESH_TOKEN_EXPIRE_IN,
  );
  return refreshToken;
};

export const refreshToken = async (refreshToken: string, userId: string) => {
  const redisRefreshToken = await redisService.get(`refresh-token:${userId}`);

  if (redisRefreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }
  const newRefreshToken = await createRefreshToken({ userId });
  const accessToken = createToken({ userId });

  return {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  };
};
