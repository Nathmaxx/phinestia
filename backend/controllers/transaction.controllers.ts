
import { Request, Response } from "express"
import { Transaction } from "../models/transaction"

export const addTransaction = async (req: Request, res: Response) => {
	console.log(req.params)
	const { title, amount, description, date, type } = req.body
	const { accountid, categoryid } = req.params

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
}

export const deleteTransaction = async (req: Request, res: Response) => {

}

export const updateTransaction = async (req: Request, res: Response) => {

}

export const getTransactions = async (req: Request, res: Response) => {

}