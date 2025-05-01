import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	budget: Number,
	allocation: Number,
	amount: {
		type: Number,
		required: true
	},
})

export const Category = mongoose.model("Cateogry", categorySchema);
