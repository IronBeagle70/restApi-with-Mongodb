// const express = require('express');
import express from 'express';

import morgan from 'morgan';

import cors from 'cors'; 

import TaskRoutes from './routes/task.routes';
import './database'; 

//config
const app=express(); //server


app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); 

app.set('port', process.env.PORT || 3000); //environment variable
app.get('/',(req,res)=>{
    res.json({message:'welcome to my app'});
});


app.use('/api/tasks',TaskRoutes);

//starting server
app.listen(app.get('port'));
console.log('Server on port',app.get('port'));



