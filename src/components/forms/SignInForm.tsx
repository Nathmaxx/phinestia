import { useRef, useState } from "react"
import { SignInInfos } from "../../types/user"
import SignInFirst from "./SignInFirst"
import SignInSecond from "./SignInSecond"
import gsap from "gsap"

type SignInFormProps = {
	className?: string
	handleToggle: () => void
}

const SignInForm = ({ className, handleToggle }: SignInFormProps) => {

	const [userInfos, setUserInfos] = useState({
		firstName: "Nath",
		email: "nath@email.com",
		password: "",
		confirmPassword: ""
	})

	const [step, setStep] = useState(1)

	const signInFirstRef = useRef<HTMLDivElement>(null)
	const signInSecondRef = useRef<HTMLDivElement>(null)

	const setInfo = (type: keyof SignInInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("Form")
	}

	const handleMove = (fromStep: number, direction: "next" | "previous") => {
		if ((fromStep === 1 && direction === "previous") || (fromStep === 2 && direction === "next")) {
			return;
		}

		const steps: { [value: number]: React.RefObject<HTMLDivElement | null> } = { 1: signInFirstRef, 2: signInSecondRef };
		const initialStepRef = steps[fromStep];
		const endStep = direction === "next" ? fromStep + 1 : fromStep - 1;
		const endStepRef = steps[endStep];

		const move = direction === 'next' ? -20 : 20;

		const tl = gsap.timeline();

		tl.to(initialStepRef.current, {
			opacity: 0,
			x: move,
			duration: 0.3,
			ease: "power1.in"
		});

		tl.call(() => {
			setStep(endStep);
		});

		tl.fromTo(
			endStepRef.current,
			{ opacity: 0, x: -move, visibility: "visible" },
			{ opacity: 1, x: 0, duration: 0.3, ease: "power1.out" },
			"+=0.05" // Délai pour que React mette à jour le DOM
		);
	};

	return (
		<form
			className={`font-bricolage flex flex-col ${className}`}
			onSubmit={handleSubmit}
		>

			<SignInFirst
				setInfo={setInfo}
				setStep={setStep}
				userInfos={userInfos}
				handleMove={handleMove}
				handleToggle={handleToggle}
				ref={signInFirstRef}
				className={`${step === 1 ? "opacity-100 visible" : "opacity-0 hidden"}`}
			/>

			<SignInSecond
				setInfo={setInfo}
				userInfos={userInfos}
				handleMove={handleMove}
				handleToggle={handleToggle}
				ref={signInSecondRef}
				className={`${step === 2 ? "opacity-100 visible" : "opacity-0 hidden"}`}
			/>
		</form>
	);
}

export default SignInForm