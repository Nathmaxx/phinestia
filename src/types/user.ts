
export type LoginInfos = {
	email: string
	password: string
}

export type SignInInfos = LoginInfos & { firstName: string }
