
type ButtonProps = {
	children: string
	className?: string
	onClick: () => void
	isLoading?: boolean
}

const Button = ({ children, className, onClick, isLoading }: ButtonProps) => {
	return (
		<button
			className={`${className} cursor-pointer px-2.5 py-1.5`}
			onClick={onClick}
			type="button"
		>
			{isLoading ? "Chargement..." : children}
		</button>
	)
}

export default Button