import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const environment = process.env.NODE_ENV;

const { Pool } = pkg;

const openDb = () => {
    const pool = new Pool ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
    pool.on('connect', () => {
        console.log('Connected to the database');
      });
      
    pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });
    return pool;
}

const pool = openDb();

export { pool };