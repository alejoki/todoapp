import fs from 'fs';
import path from 'path';
import { pool } from '../helper/db.js';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { sign } = jwt;
const { hash } = pkg;

const __dirname = import.meta.dirname;

const initializeDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../db.sql'), 'utf8');
    pool.query(sql)
}

const insertTestUser = (email, password) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query('INSERT INTO account (email, password) VALUES ($1, $2) returning *',
            [email, hashedPassword])
    })
}

const getToken = (email) => {
    return sign({user: email}, process.env.JWT_SECRET_KEY)
}

export { initializeDb, insertTestUser, getToken };