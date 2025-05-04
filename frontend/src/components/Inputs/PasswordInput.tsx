import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

type PasswordInputProps = {
	value: string
	setValue: (value: string) => void
	placeholder?: string
	className?: string
}

const PasswordInput = ({ value, setValue, placeholder, className }: PasswordInputProps) => {

	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (value: string) => {
		setValue(value)
	}

	return (
		<div className={`relative ${className}`}>
			<input
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				type={showPassword ? "text" : "password"}
				className={`w-full border border-gray-300 rounded-md outline-none py-0.5 px-1.5 font-figtree shadow-xs`}
				placeholder={showPassword ? "" : placeholder}
			/>

			{
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-all"
				>
					{showPassword ? (
						<EyeOff size={18} strokeWidth={1.5} />
					) : (
						<Eye size={18} strokeWidth={1.5} />
					)}
				</button>
			}
		</div>
	)
}

export default PasswordInput


