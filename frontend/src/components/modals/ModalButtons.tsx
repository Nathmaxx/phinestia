
type ModalButtonsProps = {
	onClose: () => void
	onConfirm: () => void
}

const ModalButtons = ({ onClose, onConfirm }: ModalButtonsProps) => {
	return (
		<div className="flex justify-end mt-3">
			<button
				onClick={onConfirm}
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
	)
}

export default ModalButtons