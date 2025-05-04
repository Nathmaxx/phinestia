

const Home = () => {

	const appUrl = import.meta.env.VITE_APP_URL

	return (
		<div className="w-full h-screen flex items-center justify-center gap-4">

			<a
				href={`${appUrl}/authentification/inscription`}
				className="rounded-lg border-2 justify-center gap-2 px-2.5 py-1 border-sky-dark-violet text-sky-dark-violet font-semibold shadow-xs font-bricolage"
				target="_blank"
			>
				Créer un compte
			</a>

			<a
				className="border-2 px-2.5 py-1 border-sky-dark-violet bg-sky-dark-violet rounded-lg text-white font-semibold shadow-xs font-bricolage"
				href={`${appUrl}/authentification/connexion`}
				target="_blank"
			>
				Se connecter
			</a>
		</div>
	)
}

export default Home