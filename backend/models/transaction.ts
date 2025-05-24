import mongoose, { Schema } from "mongoose";

enum TransactionType {
	INCOME = "income",
	EXPENSE = "expense",
}

const transactionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true,
		index: true
	},
	description: String,
	accountId: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: true,
		index: true
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	type: {
		type: String,
		enum: Object.values(TransactionType),
		required: true,
		index: true
	}
})

// Index composé pour les requêtes filtrées par compte et triées par date
transactionSchema.index({ accountId: 1, date: -1 });

// Index composé pour les requêtes filtrées par catégorie et triées par date
transactionSchema.index({ categoryId: 1, date: -1 });

export const Transaction = mongoose.model("Transaction", transactionSchema);
