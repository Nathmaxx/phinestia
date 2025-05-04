import { Response } from 'express'


export const catchError = (res: Response, error: unknown) => {
	console.log("Error : ", error)
	if (error instanceof Error) {
		res.status(500).json({ success: false, message: error.message });
	} else {
		res.status(500).json({ success: false, message: String(error) });
	}
}
