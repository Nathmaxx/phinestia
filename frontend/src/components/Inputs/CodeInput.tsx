import { useEffect, useRef } from "react"


type CodeInputProps = {
	code: string[]
	setCode: (value: string[]) => void
	codeLength: number
	className?: string
}

const CodeInput = ({ code, setCode, codeLength, className }: CodeInputProps) => {

	const inputsRef = useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value

		if (!/^[0-9]?$/.test(value)) return

		const newCode = [...code]
		newCode[index] = value
		setCode(newCode)

		if (value && index < codeLength - 1) {
			inputsRef.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const paste = e.clipboardData.getData('text').slice(0, codeLength);
		if (!/^[0-9]+$/.test(paste)) return;

		const newCode = [...code];
		paste.split('').forEach((char, idx) => {
			if (idx < codeLength) {
				newCode[idx] = char;
			}
		});
		setCode(newCode);

		const nextIndex = paste.length >= codeLength ? codeLength - 1 : paste.length;
		inputsRef.current[nextIndex]?.focus();
	};

	useEffect(() => {
		inputsRef.current[0]?.focus()
	}, [])

	return (
		<div className={`flex gap-2.5 ${className}`}>
			{code.map((value, index) => (
				<input
					key={index}
					ref={(el) => {
						inputsRef.current[index] = el
					}}
					type="text"
					inputMode="numeric"
					maxLength={1}
					value={value}
					onChange={(e) => handleChange(e, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onPaste={handlePaste}
					className="w-8 h-8 text-lg text-center border-2 border-gray-300 rounded-lg"
				/>
			))}
		</div>
	);
};
export default CodeInput