const express = require('express');
const route = express.Router();
const Task = require('./model');

route.post('/api/addTask', async (req, res) => {
    try {
        console.log("add task -->",req.body);
        const { id, name, date, completed } = req.body;
        const newTask = new Task({ id, name, date, completed });

        await newTask.save();
        res.status(200).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        console.error("Error-->", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

route.get('/api/getTasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error-->", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


route.post('/api/deleteTask', async (req, res) => {
    try {
        const { id } = req.body;
        console.log("id", id);

        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });

    } catch (error) {
        console.log("Error-->", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

route.post('/api/updateTask', async (req, res) => {
    try {
        const { id, formData } = req.body;
        console.log("Received ID:", id);
        console.log("Received formData:", formData);

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { name: formData.name, date: formData.date },
            { new: true }
        );

        if (updatedTask) {
            res.status(200).json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log("Error-->", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = route;