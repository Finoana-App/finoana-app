import chalk from 'chalk';

import { app, logger } from '@/server';
import { env } from '@/common/utils/env-config';

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.log(
    chalk.green.bold(`
███████╗██╗███╗   ██╗ ██████╗  █████╗ ███╗   ██╗ █████╗ 
██╔════╝██║████╗  ██║██╔═══██╗██╔══██╗████╗  ██║██╔══██╗
█████╗  ██║██╔██╗ ██║██║   ██║███████║██╔██╗ ██║███████║
██╔══╝  ██║██║╚██╗██║██║   ██║██╔══██║██║╚██╗██║██╔══██║
██║     ██║██║ ╚████║╚██████╔╝██║  ██║██║ ╚████║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝

        ☆ Finoana API successfully started ☆
`)
  );
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
