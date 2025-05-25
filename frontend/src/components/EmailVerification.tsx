import { useEffect, useState } from "react"
import CodeInput from "./Inputs/CodeInput"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import TimerButton from "./buttons/TimerButton"

type EmailVerificationProps = {
	setMessage: (value: string) => void
	email: string
}

const EmailVerification = ({ setMessage, email }: EmailVerificationProps) => {

	const { verifyEmail, resendVerificationEmail } = useAuth()
	const navigate = useNavigate()

	const CODE_LENGTH = 6
	const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))

	useEffect(() => {
		const sendCode = async () => {
			if (code.every(value => value !== '')) {
				setMessage("")
				const codeString = code.join('')
				const response = await verifyEmail(codeString, email)
				if (!response.success) {
					setMessage(response.message)
				} else {
					navigate("/dashboard")
				}
			}
		}

		sendCode()
	}, [code, setMessage, email, verifyEmail, navigate])

	const handleResendClick = async () => {
		setMessage("")
		const response = await resendVerificationEmail(email)
		setMessage(response.message)
	}

	return (
		<div className="w-full flex flex-col items-center">
			<CodeInput
				code={code}
				setCode={setCode}
				codeLength={CODE_LENGTH}
				className="justify-center"
			/>

			<p className="font-figtree text-center mt-10">Vous n'avez pas reçu l'e-mail de confirmation ?</p>
			<TimerButton
				duration={60}
				onClick={handleResendClick}
				className=""
			>
				Renvoyer
			</TimerButton>
		</div>
	)
}

export default EmailVerification

