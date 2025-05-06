
export type Account = {
	id: string,
	name: string,
	amount: number,
	allocationUpdated: boolean
	updatedAt: Date
}

export type DBAccount = {
	_id: string,
	name: string,
	amount: number,
	userId: string,
	updatedAt: string,
	allocationUpdated: boolean
}