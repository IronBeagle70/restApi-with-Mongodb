import { Schema, model } from "mongoose"; //mongoose to use mongoDB

import mongoosePaginate from 'mongoose-paginate-v2'; //plugin to use pagination

//defining schema for the data
const taskSchema = new Schema({
    title: {
        type:String,
        required:true,
        trim:true 
    },
    description: {
        type:String,
        trim:true,
    },
    done: {
        type:Boolean,
        default:false
    }
},{
    versionKey: false, 
    timestamps: true  
});

taskSchema.plugin(mongoosePaginate); //using pagination module

export default model('Task',taskSchema); 
