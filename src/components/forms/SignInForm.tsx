import { useRef, useState } from "react"
import { SignInInfos } from "../../types/user"
import SignInFirst from "./SignInFirst"
import SignInSecond from "./SignInSecond"
import gsap from "gsap"

type SignInFormProps = {
	className?: string
}

const SignInForm = ({ className }: SignInFormProps) => {

	const [userInfos, setUserInfos] = useState({
		firstName: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [step, setStep] = useState(1)

	const [isValidPassword, setIsValidPassword] = useState(false)

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
	}

	const verifyInputs = () => {


		if (userInfos.password !== userInfos.confirmPassword) {
			return "Les mots de passes ne correspondent pas"
		}

		if (!isValidPassword) {
			return "Le mot de passe ne correspond pas aux critères"
		}

		return ""
	}

	const handleMove = (fromStep: number, direction: "next" | "previous") => {
		if ((fromStep === 1 && direction === "previous") || (fromStep === 2 && direction === "next")) {
			return;
		}

		const steps = { 1: signInFirstRef, 2: signInSecondRef };
		const initialStepRef = steps[fromStep];
		const endStep = direction === "next" ? fromStep + 1 : fromStep - 1;
		const endStepRef = steps[endStep];

		const move = direction === 'next' ? -20 : 20;

		// Créer une timeline unifiée
		const tl = gsap.timeline({
			onComplete: () => console.log("Animation completed")
		});

		// 1. Cacher le composant actuel
		tl.to(initialStepRef.current, {
			opacity: 0,
			x: move,
			duration: 0.3,
			ease: "power1.in"
		});

		// 2. Mettre à jour l'état (entre les animations)
		tl.call(() => {
			setStep(endStep);
		});

		// 3. Afficher le nouveau composant 
		tl.fromTo(
			endStepRef.current,
			{ opacity: 0, x: move, visibility: "visible" },
			{ opacity: 1, x: 0, duration: 0.3, ease: "power1.out" },
			"+=0.05" // Petit délai pour laisser React mettre à jour le DOM
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
				ref={signInFirstRef}
				className={`${step === 1 ? "opacity-100 visible" : "opacity-0 hidden"}`}
			/>



			<SignInSecond
				setInfo={setInfo}
				setIsValidPassword={setIsValidPassword}
				userInfos={userInfos}
				handleMove={handleMove}
				ref={signInSecondRef}
				className={`${step === 2 ? "opacity-100 visible" : "opacity-0 hidden"}`}
			/>

		</form>
	);
}

export default SignInForm