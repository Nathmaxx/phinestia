import { useState } from "react"
import { SignInInfos } from "../../types/user"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import Message from "../Message"
import Button from "../buttons/Button"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

type SignInSecondProps = {
	userInfos: SignInInfos
	setUserInfos: (value: SignInInfos) => void
	setInfo: (type: keyof SignInInfos, value: string) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (direction: "next" | "previous") => void
	className?: string
	handleToggle: () => void
	message: string
	setMessage: (value: string) => void
}

const SignInSecond = ({ userInfos, setInfo, ref, handleMove, className, handleToggle, message, setMessage, setUserInfos }: SignInSecondProps) => {

	const { signUp } = useAuth()

	const [isValidPassword, setIsValidPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const verifyInputs = () => {

		if (!isValidPassword) {
			return "Tous les critères ne sont pas validés"
		}

		if (userInfos.confirmPassword.length > 30 || userInfos.password.length > 30) {
			return "Veuillez entrer un mot de passe plus court"
		}

		if (userInfos.confirmPassword !== userInfos.password) {
			return "Les mots de passes ne correspondent pas"
		}

		return ""
	}

	const handleClick = async () => {
		setMessage("")
		const errorMessage = verifyInputs()
		if (errorMessage !== "") {
			setMessage(errorMessage)
			return
		}

		setIsLoading(true)

		const response = await signUp(userInfos.firstName, userInfos.email, userInfos.password)

		if (!response.success) {
			if (response.message === "Impossible d'envoyer l'e-mail de vérification" || response.message === "Un utilisateur possède déjà cet e-mail") {
				setUserInfos({
					email: "",
					firstName: "",
					password: "",
					confirmPassword: ""
				})

				handleMove("previous")
			}
			setTimeout(() => {
				setMessage(response.message)
				setIsLoading(false)
			}, 300)
			return
		}

		setIsLoading(false)
		handleMove("next")
	}

	const handleArrowClick = () => {
		handleMove("previous")
		setTimeout(() => {
			setMessage("")
		}, 300)
	}

	return (
		<div ref={ref} className={`${className} relative`}>
			<ArrowLeft className="cursor-pointer absolute -translate-full text-sky-dark-violet" onClick={() => handleArrowClick()} />
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Bienvenue {userInfos.firstName}</h2>

			<p className="text-gray-700">Mot de passe</p>
			<PasswordInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="************"
			/>

			<PasswordValidator password={userInfos.password} setIsValidPassword={setIsValidPassword} className="mb-3 mt-2" />

			<p className="text-gray-700">Confirmer le mot de passe</p>
			<PasswordInput
				value={userInfos.confirmPassword}
				setValue={(value: string) => setInfo("confirmPassword", value)}
				placeholder="************"
				className='mb-4'
			/>

			<Button
				className="w-full bg-sky-violet hover:bg-sky-dark-violet transition font-semibold text-white rounded-md py-1"
				onClick={handleClick}
				isLoading={isLoading}
			>
				Valider
			</Button>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Vous avez déjà un compte ? <span className="underline">Se connecter</span>
			</p>
		</div>
	)
}

export default SignInSecond