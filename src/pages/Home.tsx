//import LoginForm from "../components/forms/LoginForm"
import { useState } from "react"
import SignInForm from "../components/forms/SignInForm"

type MethodType = "signin" | "login"

const Home = () => {
	const [method, setMethod] = useState<MethodType>("signin")
	const [isAnimating, setIsAnimating] = useState(false)

	const handleToggle = () => {
		if (isAnimating) return;

		setIsAnimating(true);

		setTimeout(() => {
			setMethod(method === "signin" ? "login" : "signin");

			setTimeout(() => {
				setIsAnimating(false);
			}, 500);
		}, 300);
	};

	return (
		<div className="w-full h-screen flex items-center justify-center bg-sky-semiviolet/10">
			<div className="bg-[url('/login-form.jpg')] w-[1200px] h-4/5 bg-cover rounded-4xl shadow-xl relative overflow-hidden">
				<div
					className={`absolute bg-white w-[600px] h-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out
						${method === "signin"
							? "left-0 rounded-l-4xl"
							: "left-[600px] rounded-r-4xl"
						}
					`}
				>
					<div
						className={`w-[400px] mx-auto transition-all duration-300 
							${isAnimating ? "opacity-0" : "opacity-100"}
						`}
					>
						{method === "signin" ? (
							<>
								<SignInForm className="w-full" gap={6} />
								<p className="mt-1 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
									Vous avez déjà un compte ? Se connecter
								</p>
							</>
						) : (
							<>
								<div>
									<h2 className="text-2xl font-medium mb-6">Connectez-vous</h2>
								</div>
								<p className="mt-1 text-sm font-bricolage cursor-pointer" onClick={handleToggle} >
									Pas encore de compte ? S'inscrire
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home