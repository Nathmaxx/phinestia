
type ButtonProps = {
	children: string
	className?: string
	onClick: () => void
}

const Button = ({ children, className, onClick }: ButtonProps) => {
	return (
		<button
			className={`${className} cursor-pointer px-2.5 py-1.5`}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	)
}

export default Button