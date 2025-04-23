import { ReactNode } from "react"

type SubmitButtonProps = {
	children: ReactNode
	className?: string
}

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className={`w-full rounded-md bg-violet-600 hover:bg-violet-700 duration-300 transition-all text-white font-semibold py-1 cursor-pointer ${className}`}
		>
			{children}
		</button>
	)
}

export default SubmitButton