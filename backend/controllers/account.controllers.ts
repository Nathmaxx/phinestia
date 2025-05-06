import { Request, Response } from "express"
import { catchError } from "../utils/error"
import { Account } from "../models/account"
import mongoose from "mongoose"

export const addAccount = async (req: Request, res: Response) => {
	try {
		const { name, amount, userId } = req.body

		const existingAccount = await Account.findOne({ userId, name })
		if (existingAccount) {
			res.status(400).json({ success: false, message: "Un compte existe déjà sous le même nom" })
			return
		}

		const account = new Account({
			name,
			userId,
			amount
		});

		await account.save()

		res.status(201).json({ success: true, message: "Compte ajouté avec succès", account: account })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteAccount = async (req: Request, res: Response) => {
	try {
		const { accountid } = req.params

		if (!mongoose.Types.ObjectId.isValid(accountid)) {
			res.status(400).json({ success: false, message: "Format d'identifiant de compte invalide" });
			return
		}

		const deleteAccount = await Account.findByIdAndDelete(accountid)
		if (!deleteAccount) {
			res.status(400).json({ success: false, message: "Aucun compte trouvé" })
			return
		}

		res.status(200).json({ success: true, message: "Compte supprimé avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updateAccount = async (req: Request, res: Response) => {

}

export const getAccounts = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params

		if (!userid) {
			res.status(400).json({ success: false, message: "Données manquantes" })
			return
		}

		const accounts = await Account.find({ userId: userid })

		res.status(200).json({ success: true, message: "Comptes récupérés", accounts })
	} catch (error) {
		catchError(res, error)
	}
}