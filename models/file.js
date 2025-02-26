// import { request } from "express";
import mongoose from "mongoose";

// const Schema=mongoose.Schema;

// const fileSchema= new Schema({
//     filename: {type:String, required: true},
//     path: {type:String,required:true},
//     size: {type: Number, required:true},
//     uuid: {type:String,required:true},
//     sender: {type:String,request:false},
//     receiver:{type:String,required:false},
// },{timestamps:true});


const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
}, { timestamps: true });


const File = mongoose.model("File", fileSchema);

export default File;