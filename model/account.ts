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
	}
})

export const Account = mongoose.model("Account", accountSchema);
