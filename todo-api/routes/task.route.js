const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');
const { isAdmin } = require('../middlewares/isAdmin');

router.post('/', isAdmin, taskController.create);
router.get('/', taskController.getTasks);
router.get('/:taskId', isAdmin, taskController.getTask);
router.put('/:taskId', isAdmin, taskController.updateTask);
router.delete('/:taskId', isAdmin, taskController.deleteTask);

module.exports = router;
