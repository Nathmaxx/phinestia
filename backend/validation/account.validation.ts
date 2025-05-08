import { z } from "zod";


export const createAccountSchema = z.object({
	name: z.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" })
		.max(30, { message: "Le nom ne peut pas dépasser 30 caractères" }),
	amount: z.number()
		.min(0, { message: "Le montant doit être positif" })
		.max(999999999.99, { message: "Le montant est trop élevé" }),
	userId: z.string()
});

export const updateAccountInfosSchema = z.object({
	name: z.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" })
		.max(30, { message: "Le nom ne peut pas dépasser 30 caractères" }),
	amount: z.number()
		.min(0, { message: "Le montant doit être positif" })
		.max(999999999.99, { message: "Le montant est trop élevé" })
})

export const createCategorySchema = z.object({
	name: z.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" })
		.max(30, { message: "Le nom ne peut pas dépasser 30 caractères" }),
})