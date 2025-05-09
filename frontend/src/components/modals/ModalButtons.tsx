import { useState } from "react"
import { Operation } from "../../types/context"
import Message from "../Message"

type ModalButtonsProps = {
	onClose: () => void
	onConfirm: () => Promise<Operation>
}

const ModalButtons = ({ onClose, onConfirm }: ModalButtonsProps) => {

	const [message, setMessage] = useState("")

	const handleValidate = async () => {
		setMessage("")
		const response = await onConfirm()
		if (!response.success) {
			setMessage(response.message)
			return
		}
		onClose()
	}

	return (
		<div className="mt-3">
			<div className="flex justify-end">
				<button
					onClick={handleValidate}
					className="px-3 py-0.5 bg-sky-violet text-white rounded hover:bg-sky-dark-violet transition-colors mr-2"
				>
					Confirmer
				</button>
				<button
					onClick={onClose}
					className="px-3 py-0.5 bg-white text-sky-violet rounded border border-sky-violet hover:text-sky-dark-violet hover:border-sky-dark-violet transition-all hover:bg-sky-violet/10"
				>
					Annuler
				</button>
			</div>
			<Message className="mt-3" message={message} />
		</div>
	)
}

export default ModalButtons