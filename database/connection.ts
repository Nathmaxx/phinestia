import mongoose from "mongoose"


export const connect = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI as string)
		console.log("Connected to database")
	} catch (error) {
		console.log("Error while connecting to DB : ", error)
	}
}