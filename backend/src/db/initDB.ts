import sqlite3 from 'sqlite3';
// import { open } from 'sqlite3';

export const initializeDatabase = async () => {

    console.log('<<<<<<<<<<<<<<< initializeDatabase >>>>>>>>>>>>>>>>>');
    //const db = new sqlite3.Database('./jobMarket_db.db'); // Use in-memory SQLite for simplicity

    // Create a new SQLite database
    const db = new sqlite3.Database('mydb.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the database.');
  
      // Create a table if it doesn't exist
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table created.');
        }
      });

      db.run(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        requirements TEXT,
        posterName TEXT,
        contactInfo TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        expirationTime DATETIME
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('jobs Table created.');
        }
      });
    
    db.run(`
      CREATE TABLE bids (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        jobId INTEGER,
        bidderName TEXT,
        bidAmount REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (jobId) REFERENCES jobs(id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('bids Table created.');
        }
      });

      db.run(`
        CREATE VIEW JobWithBidCount AS
        SELECT 
            j.id,
            j.title,
            j.description,
            j.requirements,
            j.posterName,
            j.contactInfo,
            j.expirationTime,
            j.createdAt,
            COUNT(b.id) AS bidCount
        FROM Job j
        LEFT JOIN Bid b ON j.id = b.jobId
        GROUP BY j.id;
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('bids Table created.');
        }
      });

    }
  });

 

  return db;



    //console.log('<<<<<<<<<<<<<<< initializeDatabase >>>>>>>>>>>>>>>>> DB:', db);

//   const db = await open({
//     filename: './database.sqlite',
//     driver: sqlite3.Database,
//   });
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS jobs (
//       id INTEGER PRIMARY KEY,
//       title TEXT,
//       description TEXT,
//       requirements TEXT,
//       posterName TEXT,
//       contactInfo TEXT,
//       expirationTime TEXT,
//       createdAt TEXT
//     );
//   `);
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS bids (
//       id INTEGER PRIMARY KEY,
//       jobId INTEGER,
//       amount REAL,
//       createdAt TEXT,
//       FOREIGN KEY(jobId) REFERENCES jobs(id)
//     );
//   `);


    // Create tables
// db.serialize(() => {
//     db.run(`
//       CREATE TABLE jobs (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT,
//         description TEXT,
//         requirements TEXT,
//         posterName TEXT,
//         contactInfo TEXT,
//         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//         expirationTime DATETIME
//       )
//     `);
//     db.run(`
//       CREATE TABLE bids (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         jobId INTEGER,
//         bidderName TEXT,
//         bidAmount REAL,
//         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (jobId) REFERENCES jobs(id)
//       )
//     `);
//   });



  return db;
};
