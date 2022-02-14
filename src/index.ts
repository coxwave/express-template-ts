import 'module-alias/register';

import * as fs from 'fs';
import * as https from 'https';

import { ENV } from '@config/env';
import { logger } from '@config/logger';

import app from '@src/app';

const useHttps = ENV.NODE_ENV === 'production';

app.listen(ENV.PORT, () => {
  logger.info(`HTTP SERVER LISTENING ON PORT ${ENV.PORT}`);
});

if (useHttps) {
  const sslOptions = { key: fs.readFileSync(ENV.SSL_KEY), cert: fs.readFileSync(ENV.SSL_CERT) };

  https.createServer(sslOptions, app).listen(ENV.HTTPS_PORT, () => {
    logger.info(`HTTPS SERVER LISTENING ON PORT ${ENV.HTTPS_PORT}`);
  });
}
