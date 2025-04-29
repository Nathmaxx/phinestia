import { useEffect, useRef, useState } from "react"
import { SignInInfos } from "../../types/user"
import Message from "../Message"
import CodeInput from "../Inputs/CodeInput"
import { useAuth } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

type SignInThirdProps = {
	className?: string
	userInfos: SignInInfos
	message: string
	setMessage: (value: string) => void
}

const SignInThird = ({ className, userInfos, message, setMessage }: SignInThirdProps) => {

	const { verifyEmail, resendVerificationEmail } = useAuth()
	const navigate = useNavigate()

	const CODE_LENGTH = 6
	const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))
	const [isDisabled, setIsDisabled] = useState(true)
	const [countdown, setCountdown] = useState(60)

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const sendCode = async () => {
			setMessage("")
			if (code.every(value => value !== '')) {
				const codeString = code.join('')
				const response = await verifyEmail(codeString, userInfos.email)
				if (!response.success) {
					setMessage(response.message)
				} else {
					navigate("/dashboard")
				}
			}
		}

		sendCode()
	}, [code, setMessage, userInfos.email, verifyEmail, navigate])

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
		const response = await resendVerificationEmail(userInfos.email)
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
		<div
			className={`${className} font-figtree flex flex-col items-center`}
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">
				Dernière étape !
			</h2>
			<p className="text-center">Un email de vérification a été envoyé à l'adresse :</p>
			<p className="text-center mb-3 font-semibold">{userInfos.email}</p>
			<p className="text-center mb-2">Entrez le code de vérification</p>
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

			<Message message={message} className="mt-5" />
		</div>
	)
}

export default SignInThird