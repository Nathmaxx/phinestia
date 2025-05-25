import { z } from 'zod'

export const addTransactionSchema = z.object({
	title: z.string().min(2, { message: "Le titre doit être compris entre 2 et 30 caractères" })
		.max(30, { message: "Le titre doit être compris entre 2 et 30 caractères" }),
	amount: z.number()
		.min(0.01, { message: "Le montant est trop petit" })
		.max(1000000, { message: "Le montant est trop grand" }),
	date: z.date({ message: "La date est incorrecte" }),
	description: z.string()
		.max(100, { message: "La description est trop longue" }).nullable(),
	type: z.enum(["income", "expense"]),
	accountName: z.string(),
	categoryName: z.string()
})