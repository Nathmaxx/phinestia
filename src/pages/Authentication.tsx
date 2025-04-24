
//import LoginForm from "../components/forms/LoginForm"
import { useEffect, useState } from "react"
import SignInForm from "../components/forms/SignInForm"
import LoginForm from "../components/forms/LoginForm"
import { useLocation, useNavigate } from "react-router-dom"

type AuthenticationProps = {
	method?: "signin" | "login"
}

const Authentication = ({ method = "signin" }: AuthenticationProps) => {
	const [currentMethod, setCurrentMethod] = useState<'login' | 'signin'>(method)
	const [isAnimating, setIsAnimating] = useState(false)
	const navigate = useNavigate();
	const location = useLocation();


	const handleToggle = () => {
		if (isAnimating) return;

		setIsAnimating(true);

		// Déterminer la nouvelle méthode et l'URL correspondante
		const newMethod = currentMethod === "signin" ? "login" : "signin";
		const newPath = `/authentification/${newMethod === "login" ? "connexion" : "inscription"}`;

		setTimeout(() => {
			setCurrentMethod(newMethod);

			setTimeout(() => {
				navigate(newPath, { replace: true });
				setIsAnimating(false);
			}, 500);
		}, 500);
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
					className={`absolute bg-white w-[600px] h-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out
						${currentMethod === "signin"
							? "left-0 rounded-l-4xl"
							: "left-[600px] rounded-r-4xl"
						}
					`}
				>
					<div
						className={`w-[400px] mx-auto transition-all duration-500 
							${isAnimating ? "opacity-0" : "opacity-100"}
						`}
					>
						{currentMethod === "signin" ? (
							<>
								<SignInForm className="w-full" gap={6} />
								<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
									Vous avez déjà un compte ? <span className="underline">Se connecter</span>
								</p>
							</>
						) : (
							<>
								<LoginForm className="w-full" gap={6} />
								<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle} >
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