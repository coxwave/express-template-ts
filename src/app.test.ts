import { StatusCodes } from 'http-status-codes';
import * as supertest from 'supertest';

import app from './app';

describe('app test', () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(() => {
    request = supertest(app);
  });
  it('GET /404 should send NotFoundError', async () => {
    const res = await request.get('/404');

    expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toStrictEqual('NotFound');
  });
});
