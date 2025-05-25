import { useState } from "react"
import { useAccount } from "../../hooks/useAccount"
import TextInput from "../Inputs/TextInput"
import ModalButtons from "./ModalButtons"

type UpdateCategoryModalProps = {
	setIsOpen: (value: boolean) => void
	initialName: string
	accountId: string
	categoryId: string
}

const UpdateCategoryModal = ({ setIsOpen, initialName, accountId, categoryId }: UpdateCategoryModalProps) => {

	const { updateCategoryName } = useAccount()

	const [name, setName] = useState(initialName)
	const [nameError, setNameError] = useState("")

	const validateName = (value: string) => {
		setName(value)

		if (!value.trim()) {
			return false
		} else if (value.trim().length < 2) {
			setNameError("Le nom doit contenir au moins 2 caractères")
			return false
		} else if (value.trim().length > 30) {
			setNameError("Le nom ne doit pas dépasser 30 caractères")
			return false
		} else {
			setNameError("")
			return true
		}
	}

	const updateName = async () => {
		if (nameError) {
			return { success: false, message: "" }
		}
		return await updateCategoryName(accountId, categoryId, name)
	}

	return (
		<>
			<p className="font-figtree mt-3">Nom</p>
			<TextInput
				value={name}
				setValue={validateName}
				placeholder="Ex: Alimentation, Loisirs"
			/>
			<p className="text-red-600 text-sm italic">{nameError}</p>
			<ModalButtons
				onClose={() => setIsOpen(false)}
				onConfirm={() => updateName()}
			/>
		</>
	)
}

export default UpdateCategoryModal