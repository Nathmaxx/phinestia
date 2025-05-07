
export type Category = {
	id: string
	amount: number
	allocation: number | null
	budget: number | null
}

export type DBCategory = {
	_id: string
	amount: number
	userId: string
	budget: number | null
	allocation: number | null
} 
