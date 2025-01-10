const express = require('express');
const router = express.Router();
const connection = require('../model/conexion');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM tasks", (err, result) => {
        if (err) {
            console.error("Error fetching tasks: ", err);
            return res.status(500).send("Error fetching tasks");
        }
        res.render('index', { data: result });
    });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/submit', (req, res) => {
    const { task_name, description } = req.body;

    connection.query('INSERT INTO tasks (name_task, description) VALUES (?, ?)', [task_name, description], (err) => {
        if (err) {
            console.error("Error adding task: ", err);
            return res.status(500).send("Error adding task");
        }
        res.redirect('/');
    });
});

router.post('/delete/:id', (req, res) => {
    const taskId = req.params.id;

    connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
        if (err) {
            console.error("Error deleting task: ", err);
            return res.status(500).send("Error deleting task");
        }
        res.redirect('/');
    });
});

router.get('/update/:id', (req, res) => {
    const taskId = req.params.id;

    connection.query("SELECT * FROM tasks WHERE id = ?", [taskId], (err, result) => {
        if (err) {
            console.error("Error fetching task: ", err);
            return res.status(500).send("Error fetching task");
        }
        res.render('update', { data: result });
    });
});

router.post('/update_submit/:id', (req, res) => {
    const taskId = req.params.id;
    const { name_task, description } = req.body;

    connection.query("UPDATE tasks SET name_task=?, description=? WHERE id=?", [name_task, description, taskId], (err) => {
        if (err) {
            console.error("Error updating task: ", err);
            return res.status(500).send("Error updating task");
        }
        res.redirect('/');
    });
});

module.exports = router;
