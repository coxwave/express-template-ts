import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
