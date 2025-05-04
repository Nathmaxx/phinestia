import { useEffect, useRef, useState } from "react"

type TimerButtonProps = {
	className?: string
	onClick: () => void
	duration: number
	children: string
	initialState?: "disabled" | "active"
}

const TimerButton = ({ className, onClick, duration, children, initialState = "disabled" }: TimerButtonProps) => {

	const [isDisabled, setIsDisabled] = useState(initialState === "active" ? false : true)
	const [countdown, setCountdown] = useState(initialState === "active" ? 0 : duration)

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (initialState === "disabled") {
			createCountDown();
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [initialState, duration])

	const handleClick = () => {
		onClick()
		setIsDisabled(true)
		setCountdown(duration)
		createCountDown()
	}

	const createCountDown = () => {

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
					}
					setIsDisabled(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isDisabled}
			className={`${className} font-figtree mt-3 py-1 px-4 rounded-md shadow-sm text-white font-medium relative overflow-hidden ${isDisabled ? "bg-sky-violet/50 cursor-not-allowed" : "bg-sky-violet cursor-pointer hover:bg-sky-dark-violet transition duration-300"}`}
		>
			{isDisabled && countdown > 0 && (
				<div
					className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all"
					style={{ width: `${(countdown / duration) * 100}%` }}
				/>
			)}

			<span className="relative z-10 flex items-center justify-center gap-2">
				{children} {countdown !== 0 ? `(${countdown}s)` : ""}
			</span>
		</button>
	)
}

export default TimerButton