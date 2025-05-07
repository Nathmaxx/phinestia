
import { Request, Response } from "express"
import { catchError } from "../utils/error"
import mongoose from "mongoose"

export const addCateogry = async (req: Request, res: Response) => {
	try {
		res.status(201).json({ success: true, message: "Catégorie ajoutée avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteCateogry = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ success: true, message: "Catégorie supprimée avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updateCategory = async (req: Request, res: Response) => {
}

export const getCategories = async (req: Request, res: Response) => {
	try {


		res.status(200).json({ success: true, message: "Catégories récupérées" })
	} catch (error) {
		catchError(res, error)
	}
}