
type TextInputProps = {
	value: string
	setValue: (value: string) => void
	placeholder?: string
	className?: string
	type?: "text" | "email"
}

const TextInput = ({ value, setValue, placeholder, className, type = "text" }: TextInputProps) => {

	const handleChange = (value: string) => {
		setValue(value)
	}

	return (
		<input
			value={value}
			onChange={(e) => handleChange(e.target.value)}
			type={type}
			className={`w-full border border-gray-300 font-figtree rounded-md outline-none py-0.5 px-1.5 shadow-xs ${className}`}
			placeholder={placeholder}
		/>
	)
}

export default TextInput