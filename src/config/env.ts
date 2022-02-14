import { config } from 'dotenv';
import * as Joi from 'joi';

config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001),
    HTTPS_PORT: Joi.number().default(3002),
    DOCS_PORT: Joi.number().default(3333),
    SSL_CERT: Joi.string().default('./certs/localhost.crt'),
    SSL_KEY: Joi.string().default('./certs/localhost.key'),
  })
  .unknown();

const { value, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env) as {
  value: {
    NODE_ENV: 'production' | 'development' | 'test';
    PORT: number;
    HTTPS_PORT: number;
    DOCS_PORT: number;
    SSL_CERT: string;
    SSL_KEY: string;
  };
  error: any;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const ENV = value;
