import mongoose from "mongoose";

export const databaseConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000
		});
		console.log(`MongoDB connecté: ${mongoose.connection.host}`);

		mongoose.connection.on('disconnected', () => {
			console.log('MongoDB déconnecté! Tentative de reconnexion...');
			setTimeout(databaseConnection, 5000);
		});
	} catch (error) {
		console.error(`Échec de connexion à MongoDB:`, error);
		process.exit(1);
	}
};