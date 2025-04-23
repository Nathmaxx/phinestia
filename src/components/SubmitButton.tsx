
type SubmitButtonProps = {
	children: string
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className="w-full rounded-md bg-violet-700 text-white font-semibold py-1"
		>
			{children}
		</button>
	)
}

export default SubmitButton