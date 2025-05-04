import { ReactNode } from "react"

type SubmitButtonProps = {
	children: ReactNode
	className?: string
	onClick?: () => void
}

const SubmitButton = ({ children, className, onClick }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className={`w-full rounded-md bg-sky-violet hover:bg-sky-dark-violet duration-300 transition-all text-white font-medium py-1 cursor-pointer ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default SubmitButton