
export type LoginInfos = {
	email: string
	password: string
}

export type SignInInfos = LoginInfos & { firstName: string }

export type UserContextInfos = {
	id: string
	firstName: string
	email: string
	isVerified: boolean
}
