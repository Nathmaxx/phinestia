import { Category, DBCategory } from "./categories"

export type Account = {
	id: string,
	name: string,
	amount: number,
	updatedAt: string
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

export type AccountName = {
	name: string,
	id: string
}