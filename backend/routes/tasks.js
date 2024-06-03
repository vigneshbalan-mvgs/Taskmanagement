const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

router.post('/', authMiddleware, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.userId });
  await task.save();
  res.send(task);
});

router.get('/', authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.send(tasks);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.send(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send({ message: 'Task deleted successfully' });
});

module.exports = router;

