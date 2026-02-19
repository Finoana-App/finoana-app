import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  HOST: z.string().nonempty().default('localhost'),
  PORT: z.coerce.number().int().positive().default(8080),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000), // 15 min in ms

  DATABASE_URL: z.string().url(),

  FIREBASE_PRIVATE_KEY: z.string().nonempty(),
  FIREBASE_CLIENT_EMAIL: z.string().nonempty(),
  FIREBASE_PROJECT_ID: z.string().nonempty(),

  CLOUDINARY_CLOUD_NAME: z.string().nonempty(),
  CLOUDINARY_API_KEY: z.string().nonempty(),
  CLOUDINARY_API_SECRET: z.string().nonempty(),
  MAX_FILE_SIZE: z.coerce.number().int().positive().default(10),
  MAX_FILES_PER_UPLOAD: z.coerce.number().int().positive().default(5),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};
