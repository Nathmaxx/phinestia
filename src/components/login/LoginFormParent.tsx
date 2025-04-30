import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

import { LoginInfos } from "../../types/user"
import ForgotPassword from "./LoginForgotPassword"
import LoginVerifyEmail from "./LoginVerifyEmail"
import LoginForm from "./LoginForm"
import { LoginPages } from "../../types/pages"

type LoginFormParentProps = {
	handleToggle: () => void
}

const LoginFormParent = ({ handleToggle }: LoginFormParentProps) => {

	const [userInfos, setUserInfos] = useState({
		email: "",
		password: ""
	})

	const [page, setPage] = useState<LoginPages>("login")

	const formRef = useRef<HTMLFormElement>(null)
	const verifyRef = useRef<HTMLDivElement>(null)
	const forgotRef = useRef<HTMLDivElement>(null)

	const setInfo = (type: keyof LoginInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const move = (nextPage: LoginPages, direction: "next" | "previous" = "next") => {

		const pages = { "login": formRef, "verify-email": verifyRef, "forgot-password": forgotRef }
		const move = direction === "next" ? -20 : 20

		gsap.to(pages[page].current, {
			opacity: 0,
			x: move,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {

				setPage(nextPage)
				setTimeout(() => {
					if (pages[nextPage] && pages[nextPage].current) {
						gsap.set(pages[nextPage].current, { opacity: 0, x: -move });

						gsap.to(pages[nextPage].current, {
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
		if (formRef && formRef.current) {
			gsap.set(formRef.current, { opacity: 1, x: 0 });
		}
	}, []);

	return (
		<>
			{page === "login" && (
				<LoginForm
					formRef={formRef}
					handleToggle={handleToggle}
					move={move}
					setInfo={setInfo}
					userInfos={userInfos}
				/>
			)}

			{page === "verify-email" && (
				<LoginVerifyEmail
					email={userInfos.email}
					verifyRef={verifyRef}
				/>
			)}

			{page === "forgot-password" && (
				<ForgotPassword
					forgotRef={forgotRef}
					move={move}
				/>
			)}
		</>
	)
}


export default LoginFormParent