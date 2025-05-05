import { Request, Response } from "express"
import { catchError } from "../utils/error"
import { Account } from "../models/account"

export const addAccount = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params
		const { name, amount } = req.body

		const existingAccount = await Account.findOne({ userId: userid, name })
		if (existingAccount) {
			res.status(400).json({ success: false, message: "Un compte existe déjà sous le même nom" })
			return
		}

		const account = new Account({
			name,
			userId: userid,
			amount
		});

		await account.save()

		res.status(201).json({ success: true, message: "Compte ajouté avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteAccount = async (req: Request, res: Response) => {

}

export const updateAccount = async (req: Request, res: Response) => {

}

export const getAccounts = async (req: Request, res: Response) => {

}