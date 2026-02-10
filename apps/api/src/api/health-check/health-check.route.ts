import express, { type Request, type Response, type Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export const healthCheckRouter: Router = express.Router();

healthCheckRouter.get('/', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
  });
});
