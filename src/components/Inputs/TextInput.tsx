
type TextInputProps = {
	value: string
	setValue: (value: string) => void
	placeholder?: string
	className?: string
	password?: boolean
}

const TextInput = ({ value, setValue, placeholder, className, password = false }: TextInputProps) => {

	const handleChange = (value: string) => {
		setValue(value)
	}

	return (
		<input
			value={value}
			onChange={(e) => handleChange(e.target.value)}
			type={password ? "password" : "text"}
			className={`w-full border border-gray-300 rounded-md outline-none py-0.5 px-1.5 shadow-xs ${className}`}
			placeholder={placeholder}
		/>
	)
}

export default TextInput