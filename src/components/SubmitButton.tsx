import { ReactNode } from "react"

type SubmitButtonProps = {
	children: ReactNode
	className?: string
}

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className={`w-full rounded-md bg-sky-violet hover:bg-sky-dark-violet duration-300 transition-all text-white font-semibold py-1 cursor-pointer ${className}`}
		>
			{children}
		</button>
	)
}

export default SubmitButton