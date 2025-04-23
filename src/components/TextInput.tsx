
type TextInputProps = {
	value: string
	setValue: (value: string) => void
}

const TextInput = ({ value, setValue }: TextInputProps) => {

	const handleChange = (value: string) => {
		setValue(value)
	}

	return (
		<input
			value={value}
			onChange={(e) => handleChange(e.target.value)}
			type="text"
			className="w-full border border-gray-300 rounded-md outline-none py-0.5 px-1"
		/>
	)
}

export default TextInput