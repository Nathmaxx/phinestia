import { useEffect, useRef, useState } from "react"
import { SignInInfos } from "../../types/user"
import SignInFirst from "./SignInFirst"
import SignInSecond from "./SignInSecond"
import gsap from "gsap"
import SignInThird from "./SignInThird"

type SignInFormProps = {
	className?: string
	handleToggle: () => void
}

const SignInForm = ({ className = "", handleToggle }: SignInFormProps) => {


	const [userInfos, setUserInfos] = useState({
		firstName: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [step, setStep] = useState(1)
	const [message, setMessage] = useState("")

	const signInFirstRef = useRef<HTMLDivElement>(null)
	const signInSecondRef = useRef<HTMLDivElement>(null)
	const signInThirdRef = useRef<HTMLDivElement>(null)

	const setInfo = (type: keyof SignInInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const handleMove = (direction: "next" | "previous") => {
		const steps: Record<number, React.RefObject<HTMLDivElement | null>> = { 1: signInFirstRef, 2: signInSecondRef, 3: signInThirdRef }

		if ((step === 1 && direction === "previous") || (step === 3 && direction === "next")) {
			return;
		}

		const currentStepRef = steps[step]
		const move = direction === 'next' ? -20 : 20;

		const nextStep = direction === "next" ? step + 1 : step - 1;

		gsap.to(currentStepRef.current, {
			opacity: 0,
			x: move,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {
				setStep(nextStep);

				setTimeout(() => {
					const newStepRef = steps[nextStep]

					if (newStepRef && newStepRef.current) {
						gsap.set(newStepRef.current, { opacity: 0, x: -move });

						gsap.to(newStepRef.current, {
							opacity: 1,
							x: 0,
							duration: 0.3,
							ease: "power2.out"
						});
					}
				}, 50);
			}
		});
	};

	useEffect(() => {
		if (signInFirstRef && signInFirstRef.current) {
			gsap.set(signInFirstRef.current, { opacity: 1, x: 0 });
		}
	}, []);


	return (
		<form
			className={`font-bricolage flex flex-col ${className}`}
			autoComplete="off"
		>
			{step === 1 && (
				<SignInFirst
					setInfo={setInfo}
					setStep={setStep}
					userInfos={userInfos}
					handleMove={handleMove}
					handleToggle={handleToggle}
					setMessage={setMessage}
					message={message}
					ref={signInFirstRef}
					className="opacity-0 visible"
				/>
			)}

			{step === 2 && (
				<SignInSecond
					setInfo={setInfo}
					setUserInfos={setUserInfos}
					userInfos={userInfos}
					handleMove={handleMove}
					handleToggle={handleToggle}
					ref={signInSecondRef}
					message={message}
					setMessage={setMessage}
					className="opacity-0 visible"
				/>
			)}

			{step === 3 && (
				<SignInThird
					userInfos={userInfos}
					message={message}
					setMessage={setMessage}
					className="opacity-0 visible"
					ref={signInThirdRef}
				/>
			)}
		</form>
	);
}

export default SignInForm