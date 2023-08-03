import * as path from 'path';

import * as dotenv from 'dotenv';

import { getEnv, getEnvOptional, normalizePort } from '@/lib/env';

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  )
});

export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    port: normalizePort(getEnv('APP_PORT'))
  },
  db: {
    type: getEnv('DB_TYPE'),
    url: getEnvOptional('DB_URL'),
    host: getEnvOptional('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    username: getEnvOptional('DB_USERNAME'),
    password: getEnvOptional('DB_PASSWORD'),
    port: parseInt(getEnvOptional('DB_PORT') as any, 10)
  }
};
