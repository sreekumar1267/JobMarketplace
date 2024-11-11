import express from 'express';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobRoutes';
import bidRoutes from './routes/bidRoutes';
import { Request, Response } from 'express';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import { initializeDatabase } from './db/initDB';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();
const port = 3001;

app.use(bodyParser.json({ limit: '10kb' }));
app.use(apiLimiter);

// initializeDatabase().then((db) => {
//   app.locals.db = db;
//   console.log('Database initialized');
// });

const prisma = new PrismaClient();
app.locals.prisma = prisma;


app.use(cors({
  origin: 'http://localhost:8080',  // Allow only requests from the frontend
  methods: ['GET', 'POST']           // Define allowed methods
}));

//Routes
app.use('/api', jobRoutes);
app.use('/api', bidRoutes);

//error handling
app.use(errorHandler);


/*
// API to create a new job
app.post('/api/jobs', (req: Request, res: Response) => {
  const { title, description, requirements, posterName, contactInfo } = req.body;
  const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  db.run(
    'INSERT INTO jobs (title, description, requirements, posterName, contactInfo, expirationTime) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, requirements, posterName, contactInfo, expirationTime],
    function (err) {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: this.lastID });
    }
  );
});

// API to get jobs (with optional filtering)
app.get('/api/jobs', (req: Request, res: Response) => {
  const filter = req.query.filter as string;
  let query = `
    SELECT *,
    (SELECT COUNT(*) FROM bids WHERE bids.jobId = jobs.id) as bidsCount,
    (SELECT MIN(bidAmount) FROM bids WHERE bids.jobId = jobs.id) as lowestBid
    FROM jobs
  `;
  if (filter === 'recent') {
    query += ' ORDER BY createdAt DESC LIMIT 5';
  } else if (filter === 'active') {
    query += ' ORDER BY bidsCount DESC LIMIT 5';
  }
  db.all(query, (err, rows: Job[]) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// API to get a specific job
app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const jobId = req.params.id;
  db.get(
    `
    SELECT *,
    (SELECT MIN(bidAmount) FROM bids WHERE bids.jobId = jobs.id) as lowestBid,
    (SELECT COUNT(*) FROM bids WHERE bids.jobId = jobs.id) as bidsCount
    FROM jobs WHERE id = ?
  `,
    [jobId],
    (err, row: Job) => {
      if (err) return res.status(500).json(err);
      res.json(row);
    }
  );
});

// API to place a new bid
app.post('/api/jobs/:id/bids', (req: Request, res: Response) => {
  const jobId = req.params.id;
  const { bidAmount } = req.body;
  db.run('INSERT INTO bids (jobId, bidderName, bidAmount) VALUES (?, "Anonymous", ?)', [jobId, bidAmount], function (err) {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: this.lastID });
  });
});
*/


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
