// require('dotenv').config();
import dotenv from 'dotenv';

// const mongoose = require('mongoose');
import mongoose from 'mongoose';

dotenv.config();



const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;