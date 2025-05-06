
import { Request, Response } from "express"
import { Category } from "../models/category"
import { catchError } from "../utils/error"

export const addCateogry = async (req: Request, res: Response) => {
	try {
		const { name, amount, userId } = req.body

		const existingCategory = await Category.findOne({ userId, name })
		if (existingCategory) {
			res.status(400).json({ success: false, message: "Une catégorie existe déjà sous le même nom" })
			return
		}

		const category = new Category({
			name,
			userId,
			amount,
			allocation: null,
			budget: null
		});

		await category.save()

		res.status(201).json({ success: true, message: "Compte ajouté avec succès", category })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteCateogry = async (req: Request, res: Response) => {

}

export const updateCateogry = async (req: Request, res: Response) => {

}

export const getCategories = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params

		if (!userid) {
			res.status(400).json({ success: false, message: "Données manquantes" })
			return
		}

		const categories = await Category.find({ userId: userid })

		res.status(200).json({ success: true, message: "Comptes récupérés", categories })
	} catch (error) {
		catchError(res, error)
	}
}