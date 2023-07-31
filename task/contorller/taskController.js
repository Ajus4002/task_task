const Task = require('../models/task')

const assignTask = async (req, res) => {
    try {
      const { taskNo, toUser } = req.body; 

      const parentTask = await Task.findOne({ taskNo });
      if (!parentTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const subtaskNo = await generateSubtaskNumber(parentTask);
      const subtask = new Task({
        title: parentTask.title,
        taskNo: `${parentTask.taskNo}.${subtaskNo}`,
        description: parentTask.description,
        parentTask: parentTask._id,
        createdBy: toUser,
      });
      
      await subtask.save();
      parentTask.subtasks.push(subtask._id);
      await parentTask.save();
  
      return res.json({ message: 'Subtask created successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const createTask = async (req, res) => {
    try {
      const { title, description, createdBy } = req.body;

      let taskNo = 't1';
      const latestTask = await Task.findOne().sort({ createdAt: -1 });
  if (latestTask) {
    const lastTaskNo = parseInt(latestTask.taskNo.slice(1));
    taskNo = `t${lastTaskNo + 1}`;
  } 

      const task = new Task({ title, description, createdBy, taskNo });
      await task.save();
  
      return res.json({ taskNo, message: 'created successfully' });
    } catch (err) {
        console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

const getTask = async(req, res)=>{
    const userID = "aju";
   try{
  const task = await Task.find({$or:[{ createdBy: userID }, { assignedTo: userID }]})
  res.json(task)
   }
   catch(err){
    console.log(err)
   }

}

const listTask = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await Task.find({ createdBy: userId }).lean();
      
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
}

async function generateSubtaskNumber(parentTask) {
  if (parentTask.subtasks.length === 0) {
    return '1';
  } else {
    const latestSubtask = await Task.findById(parentTask.subtasks[parentTask.subtasks.length - 1]);
    const parts = latestSubtask.taskNo.split('.');
    const lastSubtaskNo = parts[parts.length - 1];
    const newSubtaskNo = parseInt(lastSubtaskNo) + 1;
    return newSubtaskNo.toString();
  }
}

module.exports = { createTask, getTask, assignTask, listTask }
