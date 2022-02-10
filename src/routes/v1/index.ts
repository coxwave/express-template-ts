import { Router } from 'express';

import { logger } from '@config/logger';

const router = Router();

router.get('/', async (req, res) => {
  logger.info(req.locals.hello);

  res.json({ status: 'ok' });
});

export default router;
