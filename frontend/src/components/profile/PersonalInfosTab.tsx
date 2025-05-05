import { useEffect, useState } from "react"
import TextInput from "../Inputs/TextInput"
import Button from "../buttons/Button"
import Message from "../Message"
import { useAuth } from "../../hooks/useAuthContext"
import { validateEmail, validateFirstName } from "../../utils/validation"
import CodeInput from "../Inputs/CodeInput"
import TimerButton from "../buttons/TimerButton"

const PersonalInfoTab = () => {

	const { userInfos, updateFirstName, updateEmail, verifyNewEmail } = useAuth()
	const [firstName, setFirstName] = useState(userInfos.firstName)
	const [email, setEmail] = useState(userInfos.email)
	const [message, setMessage] = useState("")

	const [isUpdateFirstName, setIsUpdateFirstName] = useState(false)
	const [isUpdateEmail, setIsUpdateEmail] = useState(false)

	const [isFirstNameLoading, setIsFirstNameLoading] = useState(false)
	const [isEmailLoading, setIsEmailLoading] = useState(false)

	const [showCodeVerification, setShowCodeVerification] = useState(false)

	const CODE_LENGTH = 6
	const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))

	const handleUpdateFirstName = async () => {
		setIsFirstNameLoading(true)
		setMessage("")

		if (firstName === userInfos.firstName) {
			setIsUpdateFirstName(false)
			setIsFirstNameLoading(false)
			return
		}

		const verifyFirstName = validateFirstName(firstName)
		if (verifyFirstName !== "") {
			setMessage(verifyFirstName)
			setIsFirstNameLoading(false)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const response = await updateFirstName(firstName)
		if (!response.success) {
			setFirstName(userInfos.firstName)
			setMessage(response.message)
			setIsFirstNameLoading(false)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("Le prénom a été modifié")
		setIsUpdateFirstName(false)
		setIsFirstNameLoading(false)
		setTimeout(() => setMessage(""), 3000)
	}

	const handleUpdateEmail = async () => {
		setIsEmailLoading(true)
		setMessage("")

		if (email === userInfos.email) {
			setIsUpdateEmail(false)
			setIsEmailLoading(false)
			return
		}

		const verifyEmail = validateEmail(email)
		if (!verifyEmail) {
			setMessage("L'e-mail est incorrect")
			setIsEmailLoading(false)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const response = await updateEmail(email)
		if (!response.success) {
			setEmail(userInfos.email)
			setMessage(response.message)
			setIsUpdateEmail(false)
			setIsEmailLoading(false)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("L'e-mail de vérification a été envoyé, veuillez consulter votre boîte mail")
		setShowCodeVerification(true)
		setIsEmailLoading(false)
		setTimeout(() => setMessage(""), 3000)
	}

	useEffect(() => {
		const sendCode = async () => {
			if (code.every(value => value !== '')) {
				setMessage("")
				const codeString = code.join('')
				const response = await verifyNewEmail(codeString, email)
				if (!response.success) {
					setTimeout(() => setMessage(""), 3000)
					setMessage(response.message)
				} else {
					setCode(Array(CODE_LENGTH).fill(''))
					setMessage("E-mail modifié avec succès")
					setShowCodeVerification(false)
					setIsUpdateEmail(false)
					setTimeout(() => setMessage(""), 3000)
				}
			}
		}

		sendCode()
	}, [code, setMessage, email, verifyNewEmail])

	const handleResend = async () => {
		setMessage("")
		const response = await updateEmail(email)
		setMessage(response.message)
		setTimeout(() => setMessage(""), 3000)
	}

	return (
		<div className="w-full">
			<div>

			</div>
			<h2 className="text-xl font-semibold text-gray-800 mb-4 font-figtree">
				Informations personnelles
			</h2>

			<section className="w-full mb-4">
				<p className="text-gray-700 mb-1">Prénom</p>
				<div className="w-full grid grid-cols-2 gap-x-4 items-center">
					{!isUpdateFirstName && <p className="px-1.5 border border-white py-0.5">{userInfos.firstName}</p>}
					{isUpdateFirstName && <TextInput
						value={firstName}
						setValue={setFirstName}
						placeholder="Votre prénom"
						className="h-min"
					/>}
					{!isUpdateFirstName &&
						< Button
							className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 font-light text-white font-figtree"
							onClick={() => setIsUpdateFirstName(true)}
						>
							Modifier
						</Button >}
					<div className="flex gap-3">
						{isUpdateFirstName &&
							<Button
								onClick={() => {
									setIsUpdateFirstName(false)
									setFirstName(userInfos.firstName)
								}}
								className="rounded-md px-1.5 py-0.5 bg-sky-salmon/80 text-white font-thin"
							>
								Annuler
							</Button>}
						{isUpdateFirstName &&
							<Button
								onClick={handleUpdateFirstName}
								className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 text-white font-light font-figtree"
								isLoading={isFirstNameLoading}
							>
								Valider
							</Button>}
					</div>
				</div>

			</section >

			<section className="mb-6 w-full">
				<p className="text-gray-700 mb-1">Email</p>
				<div className="w-full grid grid-cols-2 gap-x-4 items-center">
					{!isUpdateEmail && <p className="px-1.5 border border-white py-0.5 ">{userInfos.email}</p>}
					{isUpdateEmail && <TextInput
						value={email}
						setValue={setEmail}
						placeholder="Votre e-mail"
						className="h-min"
					/>}
					{!isUpdateEmail &&
						<Button
							className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 text-white font-light font-figtree"
							onClick={() => setIsUpdateEmail(true)}
						>
							Modifier
						</Button >}
					<div className="flex gap-3">
						{isUpdateEmail &&
							<Button
								onClick={() => {
									setIsUpdateEmail(false)
									setEmail(userInfos.email)
								}}
								className="rounded-md px-1.5 py-0.5 bg-sky-salmon/80 text-white font-thin"
							>
								Annuler
							</Button>}
						{isUpdateEmail &&
							<Button
								onClick={handleUpdateEmail}
								className={`rounded-md px-1.5 py-0.5 bg-sky-semiviolet text-white font-thin ${showCodeVerification ? "cursor-not-allowed" : ""}`}
								disabled={showCodeVerification}
								isLoading={isEmailLoading}
							>
								Valider
							</Button>}
					</div>
				</div>

				<p className="text-sm text-gray-500 mt-1">
					Cette adresse email est utilisée pour vous connecter
				</p>
			</section>
			{showCodeVerification && <section>
				<CodeInput
					code={code}
					setCode={setCode}
					codeLength={CODE_LENGTH}
				/>

				<p className="font-figtree mt-2">Vous n'avez pas reçu l'e-mail de confirmation ?</p>
				<TimerButton
					duration={60}
					onClick={handleResend}
					className="mb-3"
				>
					Renvoyer
				</TimerButton>
			</section>}
			<Message message={message} className="mt-4" />
		</div >
	)
}

export default PersonalInfoTab