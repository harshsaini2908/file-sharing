// // const express = require("express");
// import express from "express";
// import filesRoute from './routes/files.js';
// import showRoute from './routes/show.js';
// import path from "path";

// const app=express();

// // const connectDB = require('./config/db');
// import connectToMongoDB from "./config/db.js";

// const PORT=process.env.PORT || 3000;

// //Template engine
// app.set('views',path.join(__dirname,'/views'));
// app.set('view engine','ejs');

// // Routes
// app.use('/api/files',filesRoute);
// app.use('/files',showRoute);


// app.listen(PORT,()=>{
//     // connectDB();
//     connectToMongoDB();
//     console.log(`Listening on port ${PORT}`);
// })



import express from "express";
import filesRoute from './routes/files.js';
import showRoute from './routes/show.js';
import path from "path";
import { fileURLToPath } from 'url';
import downloadRoute from "./routes/download.js";
import cors from "cors";

import dotenv from 'dotenv';

dotenv.config();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// const allowedClients = process.env.ALLOWED_CLIENTS.split(',');

// app.use(cors({
//   origin: allowedClients,
//   // other options if needed
// }));

// Import the database connection function
import connectToMongoDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Template engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', filesRoute);
app.use('/files', showRoute);
app.use('/files/download',downloadRoute);

app.listen(PORT, () => {
    // Connect to the database
    connectToMongoDB();
    console.log(`Listening on port ${PORT}`);
});
