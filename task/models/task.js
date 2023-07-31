const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  taskNo: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  parentTask: {
    type: String,
    ref: 'Task',
  },
  createdBy: {
    type: String,
    ref: 'User',
    required: true,
  },
  subtasks: [{
    type: String,
    ref: 'Task',
  }],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
