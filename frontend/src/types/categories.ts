
export type Category = {
	name: string
	amount: number | null
	allocation: number | null
	id: string
}

export type DBCategory = {
	name: string
	amount: number | null
	allocation: number | null
	_id: string
}

export type UpdatedCategory = {
	id: string
	name: string
	amount: number
}
