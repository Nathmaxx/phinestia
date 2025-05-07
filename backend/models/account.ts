import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	categories: [{
		name: { type: String, required: true },
		budget: { type: Number, default: null },
		amount: { type: Number, default: null },
		allocation: { type: Number, default: null }
	}],
	updatedAt: {
		type: Date,
		default: new Date(Date.now()),
		required: true
	}
})

export const Account = mongoose.model("Account", accountSchema);
