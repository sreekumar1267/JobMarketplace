import { Router } from 'express';
import { placeBid } from '../controllers/bidController';

const router = Router();

router.post('/jobs/:id/bids', placeBid);

export default router;
