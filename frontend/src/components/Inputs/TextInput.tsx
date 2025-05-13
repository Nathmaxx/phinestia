
type TextInputProps = {
	value: string
	setValue: (value: string) => void
	placeholder?: string
	className?: string
	type?: "text" | "email"
	id?: string
}

const TextInput = ({ value, setValue, placeholder, className, type = "text", id }: TextInputProps) => {

	const handleChange = (value: string) => {
		setValue(value)
	}

	return (
		<input
			value={value}
			id={id}
			onChange={(e) => handleChange(e.target.value)}
			type={type}
			className={`w-full border border-gray-300 font-figtree rounded-md outline-none px-1.5 py-0.5 ${className}`}
			placeholder={placeholder}
		/>
	)
}

export default TextInput