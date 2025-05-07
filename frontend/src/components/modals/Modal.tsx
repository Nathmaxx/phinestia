import Message from "../Message"

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	title: string
	className?: string
	message?: string
}

const Modal = ({ isOpen, onClose, children, title, className = "", message = "" }: ModalProps) => {

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
					<section className="mt-3">
						{children}
					</section>
					<Message message={message} />
				</div>
			</div>
		</div>
	)
}

export default Modal