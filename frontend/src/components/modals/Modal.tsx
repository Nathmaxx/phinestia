type ModalProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	children: React.ReactNode
	title: string
	className?: string
}

const Modal = ({ isOpen, onClose, children, title, onConfirm, className = "" }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs font-figtree"
			onClick={onClose}
		>
			<div className="p-6" onClick={(e) => e.stopPropagation()}>
				<div
					className={`bg-white rounded-lg shadow-xl ${className}`}
				>
					<section>
						<h2 className="text-lg font-bricolage pb-2 border-b border-gray-200 font-semibold">{title}</h2>
					</section>
					<section className="my-3">
						{children}
					</section>
					<section className="flex justify-end">
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
					</section>
				</div>
			</div>
		</div>
	)
}

export default Modal