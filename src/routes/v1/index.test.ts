import { StatusCodes } from 'http-status-codes';
import * as supertest from 'supertest';

import app from '@src/app';

describe('app test', () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    request = supertest(app);
  });

  it('GET /v1 should send status: ok', async () => {
    const res = await request.get('/v1');

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toStrictEqual({ status: 'ok' });
  });
});
