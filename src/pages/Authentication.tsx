
//import LoginForm from "../components/forms/LoginForm"
import { useEffect, useRef, useState } from "react"
import SignInForm from "../components/signin/SignInForm"
import LoginForm from "../components/login/LoginFormParent"
import { useLocation, useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useAuth } from "../hooks/useAuthContext"

type AuthenticationProps = {
	method?: "signin" | "login"
}

const Authentication = ({ method = "signin" }: AuthenticationProps) => {
	const [currentMethod, setCurrentMethod] = useState<'login' | 'signin'>(method)
	const [isAnimating, setIsAnimating] = useState(false)
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuthenticated } = useAuth()

	const panelRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		if (isAnimating || !contentRef.current || !panelRef.current) return;

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
		if (panelRef.current) {
			gsap.set(panelRef.current, {
				left: method === "login" ? "600px" : "0px"
			});
		}
	}, [method]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard")
		}
	}, [isAuthenticated, navigate])

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
						className="w-[450px] mx-auto"
					>
						{currentMethod === "signin" ? (
							<>
								<SignInForm className="w-full" handleToggle={handleToggle} />
							</>
						) : (
							<>
								<LoginForm className="w-full" handleToggle={handleToggle} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Authentication