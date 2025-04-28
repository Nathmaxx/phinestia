import { useRef, useState } from "react"
import { SignInInfos } from "../../types/user"
import SignInFirst from "./SignInFirst"
import SignInSecond from "./SignInSecond"
import gsap from "gsap"
import { useAuth } from "../../hooks/useAuthContext"

type SignInFormProps = {
	className?: string
	handleToggle: () => void
}

const SignInForm = ({ className = "", handleToggle }: SignInFormProps) => {

	const { signUp } = useAuth()

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
	const formRef = useRef<HTMLFormElement>(null)

	const setInfo = (type: keyof SignInInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await signUp(userInfos.firstName, userInfos.email, userInfos.password)

		if (!response.success) {
			setMessage(response.message)
		}
	}

	const requestForSubmit = () => {
		formRef.current?.requestSubmit()
	}


	const handleMove = (direction: "next" | "previous") => {
		if ((step === 1 && direction === "previous") || (step === 2 && direction === "next")) {
			return;
		}

		const steps: { [value: number]: React.RefObject<HTMLDivElement | null> } = { 1: signInFirstRef, 2: signInSecondRef };
		const initialStepRef = steps[step];
		const endStep = direction === "next" ? step + 1 : step - 1;
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
			ref={formRef}
			autoComplete="off"
		>

			<SignInFirst
				setInfo={setInfo}
				setStep={setStep}
				userInfos={userInfos}
				handleMove={handleMove}
				handleToggle={handleToggle}
				setMessage={setMessage}
				message={message}
				ref={signInFirstRef}
				className={`${step === 1 ? "opacity-100 visible" : "opacity-0 hidden"}`}
			/>

			<SignInSecond
				setInfo={setInfo}
				userInfos={userInfos}
				handleMove={handleMove}
				handleToggle={handleToggle}
				ref={signInSecondRef}
				message={message}
				setMessage={setMessage}
				className={`${step === 2 ? "opacity-100 visible" : "opacity-0 hidden"}`}
				requestForSubmit={requestForSubmit}
			/>
		</form>
	);
}

export default SignInForm