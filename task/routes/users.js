var express = require('express');
var taskController = require('../contorller/taskController')
var router = express.Router();

/* GET users listing. */
router.post('/', taskController.createTask )
router.get('/:userId', taskController.listTask)
router.post('/assign', taskController.assignTask)
module.exports = router;
