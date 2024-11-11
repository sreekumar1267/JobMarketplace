import { Router } from 'express';
import { listJobs, addJob, getJobFromDB } from '../controllers/jobController';

const router = Router();

router.get('/jobs', listJobs);
router.post('/jobs', addJob);
router.get('/jobs/:id', getJobFromDB);

export default router;
