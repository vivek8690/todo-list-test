/* eslint-disable space-before-function-paren */
/* eslint-disable max-len */
const Task = require('../models/task.model');
const { TASKS } = require('../constants/task');
const { ErrorHandler } = require('../helpers/custom-error');

// create new task
exports.create = async (req, res, next) => {
    try {
        let task = new Task(req.body);
        const { parentId } = req.body;
        if (parentId) {
            task.isParent = false;
            const parentTask = await Task.findById(parentId);
            parentTask.childrens.unshift(task);
            parentTask.save();
        } else {
            task.isParent = true;
        }
        task = await task.save();
        res.status(200).json({ message: TASKS.CREATED, data: task });
    } catch (err) {
        next(err);
    }
};

// get task details
exports.getTask = async (req, res, next) => {
    let { taskId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (task == null) {
            console.log('in error handler');
            throw new ErrorHandler(400, TASKS.NOT_EXIST);
        }
        res.status(200).json({ message: TASKS.FETCHED, data: task });
    } catch (err) {
        next(err);
    }
};

// update task details
exports.updateTask = async (req, res, next) => {
    let { taskId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (task == null) {
            throw new ErrorHandler(400, TASKS.NOT_EXIST);
        }
        Object.keys(req.body).map((key) => {
            task[key] = req.body[key];
        });
        await task.save();
        res.status(200).json({ message: TASKS.UPDATED, data: task });
    } catch (err) {
        next(err);
    }
};

// delete task details
exports.deleteTask = async (req, res, next) => {
    let task;
    let { taskId } = req.params;
    try {
        task = await Task.findById(taskId);
        if (task == null) {
            console.log('in error handler');
            throw new ErrorHandler(400, TASKS.NOT_EXIST);
        }
        await task.remove();
        res.status(200).json({ message: TASKS.DELETED, data: task });
    } catch (err) {
        console.log("delete", err);
        next(err);
    }
};


// filter tasks
exports.getTasks = async (req, res, next) => {
    try {
        let { sortBy, search } = req.query;
        search = search || '';
        let query = { isParent: true, details: { $regex: search, $options: 'i' } };
        const tasks = await Task.find(query).populate('childrens');
        res.status(200).json({ message: TASKS.TASK_LIST, data: tasks });
    } catch (err) {
        next(err);
    }
};

