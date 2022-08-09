import { Router } from "express";

import Task from "../models/Task"; 

import { getPagination } from "../libs/getPagination";

const router=Router();


//GET mostrar todas las tareas
router.get('/',async (req,res)=>{
    try {
        const {size,page, title}= req.query; 
        const condition= title ? { title : {$regex: new RegExp(title), $options:'i'} } : {};
        console.log(condition);
        const {limit, offset} = getPagination(page,size) //querys: params api/tasks?limit=2&pag=10
        const tasks = await Task.paginate(condition,{offset,limit});   
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salio mal al mostrar todas las tareas"
        });
    }
});

//GET mostrar tareas hechas done:true

router.get('/done',async (req,res)=>{
    const tasks = await Task.find({done:true});
    res.json(tasks);
});

//GET mostrar solo una tarea
router.get('/:id', async(req,res)=>{
    const {id}=req.params
    try { 
        const task = await Task.findById(id);

        if(!task) return res.status(400).json({message: `la tarea con el id ${id} no existe`})

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al devolver la tare con id ${id}`
        });
    }
});

//POST crear una tarea
router.post('/', async (req,res)=>{

    if(!req.body.title){
        return res.status(400).send('el titulo es requerido');
    }

    try {
        const newTask= new Task({
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false 
        });
        const taskSaved = await newTask.save(); 
        // console.log(req.body);
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Algo salio mal al crear la nueva tarea"
        });
    }
});

//DELETE borrar una tarea por ID
router.delete('/:id',async (req,res)=>{
    const {id}=req.params;
    try {
        const taskDeleted = await Task.findByIdAndDelete(id);
        res.json({
            message: ` ${taskDeleted.title} eliminada` 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Algo salio mal al eliminar la tarea con id ${id}`
        });
    }
});

//PUT actualizar tares
router.put('/:id', async (req,res)=>{
    await Task.findByIdAndUpdate(req.params.id,req.body);
    res.json({message: "Tarea actualiza satisfactoriamente"});
});


export default router;