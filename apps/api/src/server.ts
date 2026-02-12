import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/health-check/health-check.route';
import { userRouter } from '@/api/user/user.route';
import { ErrorHandler, RateLimiter, RequestLogger } from '@/common/middlewares';
import { env } from '@/common/utils';

const logger = pino({ name: 'server start' });
const app: Express = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.NODE_ENV === 'development' ? '*' : env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(RateLimiter);

app.use(RequestLogger);

app.use('/', healthCheckRouter);
app.use('/users', userRouter);

app.use(ErrorHandler());

export { app, logger };
