import { config } from 'dotenv';
import * as Joi from 'joi';

config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001),
    HTTPS_PORT: Joi.number().default(3002),
    SSL_CERT: Joi.string().default('./certs/localhost.crt'),
    SSL_KEY: Joi.string().default('./certs/localhost.key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV as 'production' | 'development' | 'test';
export const port = envVars.PORT as number;
export const httpsPort = envVars.HTTPS_PORT as number;
export const sslConf = {
  cert: envVars.SSL_CERT,
  key: envVars.SSL_KEY,
} as { cert: string; key: string };
