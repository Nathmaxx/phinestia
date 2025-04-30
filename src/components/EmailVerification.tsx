import { useEffect, useRef, useState } from "react"
import CodeInput from "./Inputs/CodeInput"
import { useAuth } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

type EmailVerificationProps = {
	setMessage: (value: string) => void
	email: string
}

const EmailVerification = ({ setMessage, email }: EmailVerificationProps) => {

	const { verifyEmail, resendVerificationEmail } = useAuth()
	const navigate = useNavigate()

	const CODE_LENGTH = 6
	const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))
	const [isDisabled, setIsDisabled] = useState(true)
	const [countdown, setCountdown] = useState(60)

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

	useEffect(() => {
		createCountDown();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const handleResendClick = async () => {
		setMessage("")
		const response = await resendVerificationEmail(email)
		setMessage(response.message)
		setIsDisabled(true)
		setCountdown(60)
		createCountDown()
	}

	const createCountDown = () => {

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
					}
					setIsDisabled(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}

	return (
		<>
			<CodeInput
				code={code}
				setCode={setCode}
				codeLength={CODE_LENGTH}
			/>

			<p className="font-figtree text-center mt-10">Vous n'avez pas reçu l'e-mail de confirmation ?</p>
			<button
				type="button"
				onClick={handleResendClick}
				disabled={isDisabled}
				className={`font-figtree mt-3 py-1 px-4 rounded-md  shadow-sm text-white font-medium ${isDisabled ? "bg-sky-violet/50 cursor-not-allowed" : "bg-sky-violet cursor-pointer"}`}
			>
				Renvoyer {countdown !== 0 ? "(" + countdown + "s)" : ""}
			</button>
		</>
	)
}

export default EmailVerification

