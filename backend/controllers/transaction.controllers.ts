
import { Request, Response } from "express"
import { Account } from "../models/account"
import { Transaction } from "../models/transaction"

export const addTransaction = async (req: Request, res: Response) => {
	const { title, amount, description, date, type } = req.body
	const { accountid, categoryid } = req.params

	const account = await Account.findById(accountid)
	if (!account) {
		res.status(404).json({ success: false, message: "Impossible de trouver le compte" })
		return
	}

	const existingCategory = account.categories.some(cat => cat._id.toString() === categoryid)
	if (!existingCategory) {
		res.status(404).json({ success: false, message: "Impossible de trouver la catégorie" })
		return
	}

	const accountId = account._id

	const transaction = new Transaction({
		title,
		amount,
		date,
		description,
		accountid,
		categoryid,
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