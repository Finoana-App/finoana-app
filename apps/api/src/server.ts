import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { userRouter } from '@/api/user/user.route';
import { ErrorHandler, RateLimiter, RequestLogger } from '@/common/middlewares';
import { env } from '@/common/utils';

const logger = pino({ name: 'server start' });
const app: Express = express();
const BASE_URL = '/api/v1';

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.NODE_ENV === 'development' ? '*' : env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(RateLimiter);

app.use(RequestLogger);

app.use(`${BASE_URL}/users`, userRouter);

app.use(ErrorHandler());

export { app, logger };
