
import { Link, Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div>
			<nav className="flex gap-5 absolute">
				<Link to={'/'}>Accueil</Link>
				<Link to={'/authentification/connexion'}>Login</Link>
				<Link to={'/dashboard'}>Dashboard</Link>
				<Link to={'/profil'}>Profil</Link>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout