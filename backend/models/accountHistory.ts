import mongoose, { Schema } from "mongoose";

const accountHistorySchema = new mongoose.Schema({
	accountId: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: true
	},
	amount: {
		type: Number,
		required: true
	}

})

export const AccountHistory = mongoose.model("AccountHistory", accountHistorySchema);
