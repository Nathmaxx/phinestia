import { useEffect, useState } from "react"
import { SignInInfos } from "../../types/user"
import Message from "../Message"
import CodeInput from "../Inputs/CodeInput"

type SignInThirdProps = {
	className?: string
	userInfos: SignInInfos
	message: string
	setMessage: (value: string) => void
}

const SignInThird = ({ className, userInfos, message, setMessage }: SignInThirdProps) => {

	// const { verifyEmail } = useAuth()

	const CODE_LENGTH = 6
	const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))

	useEffect(() => {
		setMessage("")
		if (code.every(value => value !== '')) {
			setMessage("Complété")
		}
	}, [code, setMessage])

	return (
		<div
			className={`${className} font-figtree`}
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

			<Message message={message} className="mt-3" />

		</div>
	)
}

export default SignInThird