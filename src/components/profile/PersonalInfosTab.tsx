import { useState } from "react"
import TextInput from "../Inputs/TextInput"
import Button from "../buttons/Button"
import Message from "../Message"
import { useAuth } from "../../hooks/useAuthContext"
import { validateEmail, validateFirstName } from "../../utils/validation"

const PersonalInfoTab = () => {

	const { userInfos, updateFirstName, updateEmail } = useAuth()
	const [firstName, setFirstName] = useState(userInfos.firstName)
	const [email, setEmail] = useState(userInfos.email)
	const [message, setMessage] = useState("")

	const [isUpdateFirstName, setIsUpdateFirstName] = useState(false)
	const [isUpdateEmail, setIsUpdateEmail] = useState(false)

	const handleUpdateFirstName = async () => {
		setMessage("")
		const verifyFirstName = validateFirstName(firstName)
		if (verifyFirstName !== "") {
			setMessage(verifyFirstName)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const response = await updateFirstName(firstName)
		if (!response.success) {
			setFirstName(userInfos.firstName)
			setMessage(response.message)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("Le prénom a été modifié")
		setIsUpdateFirstName(false)
		setTimeout(() => setMessage(""), 3000)
	}

	const handleUpdateEmail = async () => {
		setMessage("")
		const verifyEmail = validateEmail(email)
		if (!verifyEmail) {
			setMessage("L'e-mail est incorrect")
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const response = await updateEmail(email)
		if (!response.success) {
			setEmail(userInfos.email)
			setMessage(response.message)
			setIsUpdateEmail(false)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("L'e-mail de vérification a été envoyé, veuillez consulter votre boîte mail")
		setTimeout(() => setMessage(""), 3000)
	}

	// const handleSave = async () => {
	// 	setMessage("")

	// 	const verifyFirstName = validateFirstName(firstName)
	// 	if (verifyFirstName !== "") {
	// 		setMessage(verifyFirstName)
	// 		setTimeout(() => setMessage(""), 3000)
	// 		return
	// 	}

	// 	const verifyEmail = validateEmail(email)
	// 	if (!verifyEmail) {
	// 		setMessage("L'adresse e-mail est incorrecte")
	// 		setTimeout(() => setMessage(""), 3000)
	// 		return
	// 	}

	// 	const response = await updatePersonalInfos(firstName, email)
	// 	if (!response.success) {
	// 		setEmail(userInfos.email)
	// 		setFirstName(userInfos.firstName)
	// 		setMessage(response.message)
	// 		setTimeout(() => setMessage(""), 3000)
	// 		return
	// 	}

	// 	setMessage("Les modifications ont été enregistrées")
	// 	setTimeout(() => setMessage(""), 3000)
	// }

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
							className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 font-light text-violet-50 font-figtree"
							onClick={() => setIsUpdateFirstName(true)}
						>
							Modifier
						</Button >}
					<div className="flex gap-3">
						{isUpdateFirstName &&
							<Button
								onClick={() => setIsUpdateFirstName(false)}
								className="rounded-md px-1.5 py-0.5 bg-sky-salmon/80 text-white font-thin"
							>
								Annuler
							</Button>}
						{isUpdateFirstName &&
							<Button
								onClick={handleUpdateFirstName}
								className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 text-violet-50 font-light font-figtree"
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
							className="bg-sky-semiviolet w-min rounded-md px-1.5 py-0.5 text-violet-50 font-light font-figtree"
							onClick={() => setIsUpdateEmail(true)}
						>
							Modifier
						</Button >}
					<div className="flex gap-3">
						{isUpdateEmail &&
							<Button
								onClick={() => setIsUpdateEmail(false)}
								className="rounded-md px-1.5 py-0.5 bg-sky-salmon/80 text-white font-thin"
							>
								Annuler
							</Button>}
						{isUpdateEmail &&
							<Button
								onClick={handleUpdateEmail}
								className="rounded-md px-1.5 py-0.5 bg-sky-semiviolet text-white font-thin"
							>
								Valider
							</Button>}
					</div>
				</div>

				<p className="text-sm text-gray-500 mt-1">
					Cette adresse email est utilisée pour vous connecter
				</p>
			</section>

			<Message message={message} className="mt-4" />
		</div >
	)
}

export default PersonalInfoTab