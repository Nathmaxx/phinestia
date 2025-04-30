
type ForgotPasswordProps = {
	forgotRef: React.RefObject<HTMLDivElement | null>
}

const LoginForgotPassword = ({ forgotRef }: ForgotPasswordProps) => {
	return (
		<div
			ref={forgotRef}
			className="opacity-0 w-full"
		>
			Mot de passe oublié
		</div>
	)
}

export default LoginForgotPassword