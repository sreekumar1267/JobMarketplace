import { Database } from 'sqlite3';


export const createBid = async (db: Database, jobId: string, bidAmount: number) => {
    return new Promise(function (resolve, reject) {
         db.run('INSERT INTO bids (jobId, bidderName, bidAmount) VALUES (?, "Anonymous", ?)', [jobId, bidAmount], function (err) {
            if (err) {
                console.error(err.message);
                reject(-1);
            } else {
                console.log('createBid query ran successfully. -jobId:', this.lastID );
                resolve(this.lastID);     
            }
         });
    });
}


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
  