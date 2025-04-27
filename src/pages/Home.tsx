import { useNavigate } from 'react-router-dom';

import Button from "../components/buttons/Button"
import { useAuth } from '../hooks/useAuthContext';

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth()

	const inscriptionLink = isAuthenticated ? "/dashboard" : "authentification/inscription"
	const connexionLink = isAuthenticated ? "/dashboard" : "authentification/connexion"

	return (
		<div className="w-full h-screen flex items-center justify-center gap-4">
			<Button
				onClick={() => navigate(inscriptionLink)}
				className="border-2 border-sky-dark-violet rounded-lg text-sky-dark-violet font-semibold shadow-xs font-bricolage"
			>
				Créer un compte
			</Button>
			<Button
				onClick={() => navigate(connexionLink)}
				className="border-2 border-sky-dark-violet bg-sky-dark-violet rounded-lg text-white font-semibold shadow-xs font-bricolage"
			>
				Se connecter
			</Button>
		</div>
	)
}

export default Home