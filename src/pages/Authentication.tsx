
//import LoginForm from "../components/forms/LoginForm"
import { useEffect, useRef, useState } from "react"
import SignInForm from "../components/forms/SignInForm"
import LoginForm from "../components/forms/LoginForm"
import { useLocation, useNavigate } from "react-router-dom"
import gsap from "gsap"

type AuthenticationProps = {
	method?: "signin" | "login"
}

const Authentication = ({ method = "signin" }: AuthenticationProps) => {
	const [currentMethod, setCurrentMethod] = useState<'login' | 'signin'>(method)
	const [isAnimating, setIsAnimating] = useState(false)
	const navigate = useNavigate();
	const location = useLocation();

	const panelRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null);


	const handleToggle = () => {
		if (isAnimating || !contentRef.current || !panelRef.current) return;

		console.log("Animation starting...");
		setIsAnimating(true);

		const newMethod = currentMethod === "signin" ? "login" : "signin";
		const newPath = `/authentification/${newMethod === "login" ? "connexion" : "inscription"}`;

		const tl = gsap.timeline();

		tl.to(contentRef.current, {
			opacity: 0,
			y: 15,
			duration: 0.3,
			ease: "power1.in",
		}, 0);

		tl.to(panelRef.current, {
			left: newMethod === "login" ? "600px" : "0px",
			duration: 0.9,
			ease: "power2.inOut",
			onComplete: () => {
				setCurrentMethod(newMethod);
				navigate(newPath, { replace: true });

				gsap.fromTo(
					contentRef.current,
					{ opacity: 0, y: -15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.3,
						ease: "power1.out",
						onComplete: () => {
							setIsAnimating(false);
						}
					}
				);
			}
		}, 0.1);
	};

	useEffect(() => {
		const methodFromPath = location.pathname.includes("connexion") ? "login" : "signin";
		if (methodFromPath !== currentMethod && !isAnimating) {
			setCurrentMethod(methodFromPath);
		}
	}, [location.pathname, isAnimating, currentMethod]);

	return (
		<div className="w-full h-screen flex items-center justify-center bg-sky-semiviolet/10">
			<div className="bg-[url('/login-form.jpg')] w-[1200px] h-4/5 bg-cover rounded-4xl shadow-xl relative overflow-hidden">
				<div
					ref={panelRef}
					className={`absolute bg-white w-[600px] h-full flex flex-col items-center justify-center overflow-hidden`}
				>
					<div
						ref={contentRef}
						className="w-[400px] mx-auto"
					>
						{currentMethod === "signin" ? (
							<>
								<SignInForm className="w-full" />
								<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
									Vous avez déjà un compte ? <span className="underline">Se connecter</span>
								</p>
							</>
						) : (
							<>
								<LoginForm className="w-full" />
								<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
									Pas encore de compte ? <span className="underline">S'inscrire</span>
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Authentication