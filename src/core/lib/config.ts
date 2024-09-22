import { loadEnvConfig } from "@next/env";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.number(),
    REDIS_PASSWORD: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: +process.env.REDIS_PORT!,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },
});

export default config;
