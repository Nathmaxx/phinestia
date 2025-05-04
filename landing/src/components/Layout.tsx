import { Link, Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div>
			<nav className="flex gap-5 absolute">
				<Link to={'/'}>Accueil</Link>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout