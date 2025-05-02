
import { Request, Response } from "express"

export const addCateogry = async (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: "Catérogie ajoutée" })
}

export const deleteCateogry = async (req: Request, res: Response) => {

}

export const updateCateogry = async (req: Request, res: Response) => {

}

export const getCategories = async (req: Request, res: Response) => {

}