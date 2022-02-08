import 'module-alias/register';

import * as fs from 'fs';
import * as https from 'https';

import { httpsPort, port, sslConf } from '@config/env';
import { logger } from '@config/logger';

import app from './app';

const useHttps = true;

app.listen(port, () => {
  logger.info(`HTTP SERVER LISTENING ON PORT ${port}`);
});

if (useHttps) {
  console.log(sslConf);
  const sslOptions = { key: fs.readFileSync(sslConf.key), cert: fs.readFileSync(sslConf.cert) };

  https.createServer(sslOptions, app).listen(httpsPort, () => {
    logger.info(`HTTPS SERVER LISTENING ON PORT ${httpsPort}`);
  });
}
