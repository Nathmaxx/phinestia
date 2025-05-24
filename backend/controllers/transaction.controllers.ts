
import { Request, Response } from "express"
import { Account } from "../models/account"
import { Transaction } from "../models/transaction"

export const addTransaction = async (req: Request, res: Response) => {
	const { title, amount, categoryName, accountName, description, date, type } = req.body

	const account = await Account.findOne({ accountName })
	if (!account) {
		res.status(404).json({ success: false, message: "Impossible de trouver le compte" })
		return
	}

	const categoryId = account.categories.find(cat => cat.name === categoryName)
	if (categoryId) {
		res.status(404).json({ success: false, message: "Impossible de trouver la catégorie" })
		return
	}

	const accountId = account._id

	const transaction = new Transaction({
		title,
		amount,
		date,
		description,
		accountId,
		categoryId,
		type: type === 'expense' ? 'expense' : 'income'
	})

	await transaction.save()

	res.status(201).json({ success: true, message: "Transaction ajoutée avec succès", transaction })
}

export const deleteTransaction = async (req: Request, res: Response) => {

}

export const updateTransaction = async (req: Request, res: Response) => {

}

export const getTransactions = async (req: Request, res: Response) => {

}