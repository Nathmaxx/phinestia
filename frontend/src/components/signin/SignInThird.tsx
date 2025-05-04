import { SignInInfos } from "../../types/user"
import Message from "../Message"
import EmailVerification from "../EmailVerification"

type SignInThirdProps = {
	className?: string
	userInfos: SignInInfos
	message: string
	setMessage: (value: string) => void
	ref?: React.RefObject<HTMLDivElement | null>
}

const SignInThird = ({ className, userInfos, message, setMessage, ref }: SignInThirdProps) => {

	return (
		<div
			className={`${className} font-figtree flex flex-col items-center`}
			ref={ref}
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">
				Dernière étape !
			</h2>
			<p className="text-center">Un email de vérification a été envoyé à l'adresse :</p>
			<p className="text-center mb-3 font-semibold">{userInfos.email}</p>
			<p className="text-center mb-2">Entrez le code de vérification</p>

			<EmailVerification
				email={userInfos.email}
				setMessage={setMessage}
			/>

			<Message message={message} className="mt-5" />
		</div>
	)
}

export default SignInThird