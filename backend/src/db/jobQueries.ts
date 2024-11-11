import { Database } from 'sqlite3';

export const getJobs = async (db: Database, filter: string) => {
    return new Promise(function (resolve, reject) {
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
        //console.log('====== getJobs query======:', query);
        db.all(query , (err, rows: Job[]) => {
            if (err) {
            console.error(err.message);
            reject([]);
            } else {
                console.log('getJobs query ran completed:', rows);
                resolve(rows);
            }
        });
    });
};

export const createJob = async (db: Database, jobData: any) => {
  const { title, description, requirements, posterName, contactInfo } = jobData;
  const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  return new Promise(function (resolve, reject) {
        db.run(
            `INSERT INTO jobs (title, description, requirements, posterName, contactInfo, expirationTime)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, requirements, posterName, contactInfo, expirationTime]
            , function (err) {
                if (err) {
                console.error(err.message);
                reject(-1);
                } else {
                console.log('createJob query ran successfully. -jobId:', this.lastID );
                resolve(this.lastID);     
                }
        });
   });
};

export const getJob = async (db: Database, jobId: string) => {
    return new Promise(function (resolve, reject) {
        db.get(`
                SELECT *,
                (SELECT MIN(bidAmount) FROM bids WHERE bids.jobId = jobs.id) as lowestBid,
                (SELECT COUNT(*) FROM bids WHERE bids.jobId = jobs.id) as bidsCount
                FROM jobs WHERE id = ?`,
            [jobId]
            , (err, rows: Job[]) => {
                if (err) {
                console.error(err.message);
                reject([]);
                } else {
                    console.log('getJob query ran completed:', rows);
                    resolve(rows);
                }
            });
    });
};