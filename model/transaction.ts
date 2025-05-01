import mongoose, { Schema } from "mongoose";

enum TransactionType {
	INCOME = "income",
	EXPENSE = "expense",
}

const transactionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	description: String,
	accountId: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: true
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	type: {
		type: String,
		enum: Object.values(TransactionType),
		required: true
	}
})

export const Transaction = mongoose.model("Transaction", transactionSchema);
