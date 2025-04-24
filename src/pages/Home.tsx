//import LoginForm from "../components/forms/LoginForm"
import SignInForm from "../components/forms/SignInForm"

const Home = () => {

	return (
		<div className="w-full h-screen flex items-center justify-center gap-3 bg-sky-semiviolet/10">
			<div className="bg-[url('/login-form.jpg')] w-[1200px] h-4/5 bg-cover rounded-4xl shadow-xl">
				<div className="bg-white w-[600px] h-full flex flex-col items-center justify-center rounded-l-4xl -translate-x-1">
					<SignInForm className="w-[400px]" gap={6} />
					<p className="w-[400px] mt-1 text-sm font-bricolage">Vous avez déjà un compte ? Se connecter</p>
				</div>
				{/* <LoginForm /> */}
			</div>
		</div>
	)
}

export default Home