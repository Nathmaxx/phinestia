import mongoose from "mongoose";

export const databaseConnection = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI as string);
		console.log(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		console.log(`Error connecting to MongoDB`);
		console.error(error)
	}
};