import { Router } from 'express';

import { logger } from '@config/logger';

const router = Router();

/**
 *
 * @api {GET} /v1 Get Status
 * @apiName GetStatus
 * @apiGroup General
 * @apiVersion  0.1.0
 *
 * @apiSuccess {String} status status of api server
 * @apiSuccessExample {json} Success-Response
 * HTTP/2.0 200 OK
 * {
 *     "status": "ok"
 * }
 */
router.get('/', async (req, res) => {
  logger.info(req.locals.hello);

  res.json({ status: 'ok' });
});

export default router;
