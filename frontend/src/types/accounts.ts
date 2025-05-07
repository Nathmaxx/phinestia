import { Category, DBCategory } from "./categories"

export type Account = {
	id: string,
	name: string,
	amount: number,
	updatedAt: Date
	categories: Category[]
}

export type DBAccount = {
	_id: string,
	name: string,
	amount: number,
	userId: string,
	updatedAt: string,
	categories: DBCategory[]
}