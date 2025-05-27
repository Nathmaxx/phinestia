
import { Request, Response, NextFunction } from "express"
import { Transaction } from "../models/transaction"
import { Account } from "../models/account"

export const addTransaction = async (req: Request, res: Response, next: NextFunction) => {
	const { title, amount, description, date, type } = req.body
	const { accountid, categoryid } = req.params

	const account = await Account.findById(accountid)
	if (!account) {
		res.status(404).json({ success: false, message: "Impossible de trouver le compte" })
		return
	}

	const category = account.categories.find(cat => cat._id.toString() === categoryid)
	if (!category) {
		res.status(404).json({ success: false, message: "Impossible de trouver la catégorie" })
		return
	}

	const transaction = new Transaction({
		title,
		amount,
		date,
		description,
		accountId: accountid,
		categoryId: categoryid,
		type: type === 'expense' ? 'expense' : 'income'
	})

	await transaction.save()

	res.status(201).json({ success: true, message: "Transaction ajoutée avec succès", transaction })
	next()
}

export const deleteTransaction = async (req: Request, res: Response) => {

}

export const updateTransaction = async (req: Request, res: Response) => {

}

export const getTransactions = async (req: Request, res: Response) => {

}