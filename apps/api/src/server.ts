import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { env } from './common/utils/env-config';

const logger = pino({ name: 'server start' });
const app: Express = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.NODE_ENV === 'development' ? '*' : env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

app.use('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export { app, logger };
