import { pool } from '../helper/db.js';

const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM task')
}

const insertTask = async (description) => {
    return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description])
}

const removeTask = async (id) => {
    return await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])
}

export {
    selectAllTasks,
    insertTask,
    removeTask
}