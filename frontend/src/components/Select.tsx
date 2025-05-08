
type SelectProps = {
	name: string
	id: string
	onChange: ({ name, id }: { name: string, id: string }) => void
	options: { name: string, id: string }[]
	className?: string
}

const Select = ({ name, id, onChange, options, className }: SelectProps) => {

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(options.find(option => option.name === e.target.value) || { name: "", id: "" })
	}

	return (
		<select name={name} id={id} onChange={handleChange} className={`${className}`}>
			{
				options.map((option) => (
					<option key={option.name}>
						{option.name}
					</option>
				))
			}
		</select >
	)
}

export default Select