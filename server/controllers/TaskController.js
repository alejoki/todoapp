import {selectAllTasks, insertTask, removeTask} from '../models/Task.js';


const getTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks();
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req, res, next) => {
    try {
        if (!req.body.description) {
            const error = new Error('Invalid description or task');
            error.statusCode = 400;
            return next(error)
        }
        const result = await insertTask(req.body.description);
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        if(!req.params.id) {
            const error = new Error('Invalid task id');
            error.statusCode = 400;
            return next(error)
        }
        const id = parseInt(req.params.id);
        const result = await removeTask(id);
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

export {
    getTasks,
    postTask,
    deleteTask
}