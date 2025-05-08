import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await schema.parseAsync(req.body)
			req.body = data
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					success: false,
					message: "Données invalides",
					errors: error.errors.map((e) => ({
						path: e.path.join("."),
						message: e.message
					}))
				});
				return
			}
			res.status(500).json({
				success: false,
				message: "Erreur de validation"
			});
			return
		}
	}
}