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

export const updateAccountInfos = async (req: Request, res: Response) => {
	const { accountid } = req.params
	const { name, amount } = req.body

	try {
		const account = await Account.findById(accountid)
		if (!account) {
			res.status(400).json({ success: false, message: "Aucun compte trouvé" })
			return
		}

		account.name = name
		account.amount = amount
		account.updatedAt = new Date()

		await account.save()

		res.status(200).json({ success: true, message: "Compte modifié avec succès" })
	} catch (error) {
		catchError(res, error)
	}
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

export const addCategory = async (req: Request, res: Response) => {
	try {
		const { accountid } = req.params
		const { name } = req.body

		const account = await Account.findById(accountid)
		if (!account) {
			res.status(400).json({ success: false, message: "Aucun compte trouvé" })
			return
		}

		const validateName = account.categories.every(cat => cat.name.toLowerCase() !== name.toLowerCase())
		if (!validateName) {
			res.status(400).json({ message: "Une catégorie existe déjà sous le même nom" })
			return
		}

		account.categories.push({
			name,
			allocation: null,
			amount: null,
		})

		account.updatedAt = new Date()
		await account.save()

		res.status(201).json({
			success: true,
			message: "Catégorie ajoutée avec succès",
			category: account.categories[account.categories.length - 1]
		})
	} catch (error) {
		catchError(res, error)
	}
}

export const updateCategoryName = async (req: Request, res: Response) => {
	try {
		const { accountid, categoryid } = req.params
		const { name } = req.body

		const account = await Account.findById(accountid);
		if (!account) {
			res.status(404).json({ success: false, message: "Compte non trouvé" });
			return
		}

		const nameExists = account.categories.some(
			cat => cat._id.toString() !== categoryid && cat.name.toLowerCase() === name.toLowerCase()
		)

		if (nameExists) {
			res.status(400).json({ success: false, message: "Une catégorie existe déjà sous ce nom" })
		}

		const category = account.categories.find(cat => cat._id.toString() === categoryid);

		if (!category) {
			res.status(404).json({ success: false, message: "Catégorie non trouvée" });
			return;
		}

		category.name = name;
		account.updatedAt = new Date();
		await account.save();

		res.status(200).json({ success: true, message: "Catégorie modifiée avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const { accountid, categoryid } = req.params

		const account = await Account.findById(accountid)
		if (!account) {
			res.status(404).json({ success: false, message: "Identifiant invalide" })
			return
		}

		account.categories.pull({ _id: categoryid })
		account.updatedAt = new Date()

		await account.save()

		res.status(200).json({ success: true, message: "Catégorie supprimée avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updateCategoriesAmounts = async (req: Request, res: Response) => {
	try {
		const { accountid } = req.params
		const account = await Account.findById(accountid)
		if (!account) {
			res.status(404).json({ success: false, message: "Identifiant invalide" })
			return
		}

		res.status(200).json({ success: true, message: "Montants mis à jour" })
	} catch (error) {
		catchError(res, error)
	}
}