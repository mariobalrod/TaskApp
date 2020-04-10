// * Modules
const express = require('express');
const router = express.Router();

// * Object Task Imported
const Task = require('../models/task');

//!-------------------------------------------------------------

// TODO: Listar las Tareas
router.get('/task', async (req, res) => {
    const tasks = await Task.find().sort({date: 'desc'});
    //console.log(tasks);
    res.render('tasks/task-list', { tasks });
});

//!-------------------------------------------------------------

// TODO: Añadir tareas

    // GET 
router.get('/task/add', (req, res) => {
    res.render('tasks/addTask');
});
    // POST
router.post('/task/add', async (req, res) => {
    const {title, description} = req.body;
    const errors = [];

    if(!title) {
        errors.push({text: 'El titulo es necesario!'});
    }
    
    if(!description) {
        errors.push({text: 'La descripcion es obligatoria!'});
    }
    
    if(errors.length > 0){
        res.render('tasks/addTask', {
            errors,
            title,
            description
        });
    }else {
        const task = new Task({title, description});
        await task.save();
        //console.log('Task Saved!');
        res.redirect('/task');
    }
    
});

//!-------------------------------------------------------------

// TODO: Editar Tareas
// 1. Renderizo el formulario de edicion, mandandole los datos de la Tarea.
router.get('/task/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/editTask', { task });
});

// 2. Una vez editado, edito con los nuevos datos.
router.put('/task/edit/:id', async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated");
    res.redirect("/task");

});

//!-------------------------------------------------------------

// TODO: Eliminar Tareas
router.delete('/task/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Task deleted.")
    res.redirect('/task');
});

module.exports = router;