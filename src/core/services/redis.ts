import Redis from "ioredis";
import config from "@/core/lib/config";

export const redisService = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
});
